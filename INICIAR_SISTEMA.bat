@echo off
title Sistema Alimentuus
color 0A
echo ===================================================
echo   ALIMENTUUS - GERADOR DE CATALOGO
echo   Iniciando o servidor... Por favor, aguarde.
echo   AVISO: Nao feche esta janela preta enquanto usa o site!
echo ===================================================
timeout /t 3 >nul
start http://localhost:3000
node index.js
pause