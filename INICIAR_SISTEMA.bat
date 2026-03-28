@echo off
title Servidor Alimentuus
color 0A

cd /d "%~dp0"

echo ==========================================
echo    ALIMENTUUS - GERADOR DE CATALOGO
echo ==========================================
echo.
echo Iniciando o servidor... Por favor, aguarde.
echo AVISO: Nao feche esta janela preta enquanto usa o site!
echo.

:: Abre o navegador padrao direto no site
start http://localhost:3000

npm start

pause