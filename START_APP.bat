@echo off
title ALL IN ONE CONTENT CREATOR PLANNER
cls
echo ====================================================================
echo   ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER v1.0
echo   Menjalankan Local Server & Membuka Aplikasi...
echo ====================================================================
echo.

start http://localhost:8080/index.html

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$listener = New-Object System.Net.HttpListener; ^
  $listener.Prefixes.Add('http://localhost:8080/'); ^
  try { ^
    $listener.Start(); ^
    Write-Host '>> Server aktif di: http://localhost:8080/index.html' -ForegroundColor Green; ^
    Write-Host '>> Tekan Ctrl+C di jendela ini untuk mematikan server.' -ForegroundColor Yellow; ^
    while ($listener.IsListening) { ^
      $ctx = $listener.GetContext(); ^
      $path = '.' + $ctx.Request.Url.LocalPath.Replace('/', '\'); ^
      if ($path -eq '.\') { $path = '.\index.html' }; ^
      if (Test-Path $path) { ^
        $bytes = [System.IO.File]::ReadAllBytes($path); ^
        $ext = [System.IO.Path]::GetExtension($path).ToLower(); ^
        $mime = switch ($ext) { ^
          '.html' { 'text/html; charset=utf-8' } ^
          '.js'   { 'application/javascript; charset=utf-8' } ^
          '.css'  { 'text/css; charset=utf-8' } ^
          '.json' { 'application/json; charset=utf-8' } ^
          '.svg'  { 'image/svg+xml' } ^
          '.png'  { 'image/png' } ^
          '.jpg'  { 'image/jpeg' } ^
          default { 'application/octet-stream' } ^
        }; ^
        $ctx.Response.ContentType = $mime; ^
        $ctx.Response.ContentLength64 = $bytes.Length; ^
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length); ^
      } else { ^
        $ctx.Response.StatusCode = 404; ^
      } ^
      $ctx.Response.OutputStream.Close(); ^
    } ^
  } catch { ^
    Write-Host 'Server lokal ditutup.' -ForegroundColor Red; ^
  }"

pause
