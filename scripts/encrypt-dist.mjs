import { createCipheriv, pbkdf2Sync, randomBytes } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const password = process.env.SITE_PASSWORD
if (!password) {
  throw new Error('SITE_PASSWORD must be set')
}

const outputDirectory = new URL('../dist/', import.meta.url)
const salt = randomBytes(16)
const iterations = 310_000
const key = pbkdf2Sync(password, salt, iterations, 32, 'sha256')
const files = (await readdir(outputDirectory)).filter((file) => file.endsWith('.html'))

function encode(value) {
  return Buffer.from(value).toString('base64')
}

function unlockPage({ ciphertext, iv }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Protected workshop</title>
<style>:root{font-family:Arial,sans-serif;color:#0a3b35;background:#e9e7e2}*{box-sizing:border-box}body{margin:0}.bar{height:74px;display:flex;align-items:center;gap:15px;padding:0 22px;background:#fff;border-bottom:1px solid #ccdad5}.bi-mark{width:128px;height:42px}.ms-mark{width:23px;height:23px}.bar span{width:1px;height:29px;background:#ccdad5}.bar strong{color:#777;font-size:18px}.gate{min-height:calc(100vh - 74px);display:grid;place-items:center;padding:24px}.panel{width:min(620px,100%);padding:44px;background:#fff;border:1px solid #ccdad5;box-shadow:0 18px 50px #0a3b351a}.eyebrow{margin:0 0 14px;color:#007e67;text-transform:uppercase;letter-spacing:1.7px;font-weight:800;font-size:12px}.panel h1{margin:0 0 16px;font-size:44px;line-height:1.08}.panel>p:not(.eyebrow):not(.error){color:#405d58;font-size:15px;line-height:1.6;margin:0 0 28px}.panel label{display:block;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}.row{display:grid;grid-template-columns:1fr auto;gap:8px}.row input{min-width:0;height:48px;border:1px solid #aebfba;padding:0 14px;font-size:16px}.row button{height:48px;border:0;border-radius:24px;padding:0 20px;background:#0a3b35;color:#fff;font-weight:700;cursor:pointer}.error{color:#a72f20;font-size:13px;margin:10px 0 0}.busy{opacity:.65;pointer-events:none}@media(max-width:560px){.panel{padding:30px 22px}.panel h1{font-size:36px}.row{grid-template-columns:1fr}.row button{width:100%}}</style></head>
<body><header class="bar"><img class="bi-mark" src="./boehringer-ingelheim.svg" alt="Boehringer Ingelheim"><span></span><img class="ms-mark" src="./microsoft-mark.svg" alt=""><strong>Microsoft</strong></header><main class="gate"><section class="panel"><p class="eyebrow">DataLand Round 2 briefing</p><h1>Protected workshop</h1><p>The briefing is encrypted. Enter the workshop password to decrypt it in this browser.</p><form><label for="password">Password</label><div class="row"><input id="password" type="password" autocomplete="current-password" autofocus><button type="submit">Decrypt briefing</button></div><p class="error" role="alert" hidden>Incorrect password. Check the invitation and try again.</p></form></section></main>
<script>const payload='${ciphertext}',iv='${iv}',salt='${encode(salt)}',iterations=${iterations},storageKey='dataland-content-key';const bytes=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));const text=new TextDecoder();async function decrypt(key){const html=text.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(iv)},key,bytes(payload))),parsed=new DOMParser().parseFromString(html,'text/html');document.title=parsed.title;document.head.innerHTML=parsed.head.innerHTML;document.body.innerHTML=parsed.body.innerHTML;for(const oldScript of [...document.scripts]){const script=document.createElement('script');for(const attribute of oldScript.attributes)script.setAttribute(attribute.name,attribute.value);script.textContent=oldScript.textContent;oldScript.replaceWith(script)}}async function submit(password){const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveKey']);const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(salt),iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},true,['decrypt']);await decrypt(key);sessionStorage.setItem(storageKey,btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.exportKey('raw',key)))))}async function restore(){const saved=sessionStorage.getItem(storageKey);if(!saved)return;try{const key=await crypto.subtle.importKey('raw',bytes(saved),{name:'AES-GCM'},true,['decrypt']);await decrypt(key)}catch{sessionStorage.removeItem(storageKey)}}document.querySelector('form').addEventListener('submit',async event=>{event.preventDefault();const panel=document.querySelector('.panel'),error=document.querySelector('.error');panel.classList.add('busy');error.hidden=true;try{await submit(document.querySelector('#password').value)}catch{error.hidden=false;panel.classList.remove('busy')}});restore();</script></body></html>`
}

for (const file of files) {
  const path = join(outputDirectory.pathname, file)
  const plaintext = await readFile(path)
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()])
  await writeFile(path, unlockPage({ ciphertext: encode(encrypted), iv: encode(iv) }))
}

console.log(`Encrypted ${files.length} HTML pages with AES-256-GCM`)