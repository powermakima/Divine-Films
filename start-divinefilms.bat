@echo off
setlocal EnableDelayedExpansion
set ROOT=C:\Users\kiana\Documents\CODING PROJECTS\divinefilms
set FRONTEND_PORT=5173

echo Starting DivineFilms...
echo.

rem Try common MongoDB service names
sc query MongoDB >nul 2>&1
if %errorlevel%==0 (
  net start MongoDB >nul 2>&1
  echo MongoDB service checked: MongoDB
  goto :startapps
)

sc query MongoDBServer >nul 2>&1
if %errorlevel%==0 (
  net start MongoDBServer >nul 2>&1
  echo MongoDB service checked: MongoDBServer
  goto :startapps
)

echo MongoDB service name not found. Start MongoDB manually if needed.
echo.

:startapps
start "DivineFilms Backend" cmd /k "cd /d %ROOT%\backend && npm run dev"
timeout /t 6 /nobreak >nul

set FRONTEND_PID=
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :%FRONTEND_PORT% ^| findstr LISTENING') do (
  set FRONTEND_PID=%%P
)

if defined FRONTEND_PID (
  echo Releasing port %FRONTEND_PORT% from PID !FRONTEND_PID!...
  taskkill /PID !FRONTEND_PID! /F >nul 2>&1
  timeout /t 2 /nobreak >nul
)

start "DivineFilms Frontend" cmd /k "cd /d %ROOT%\frontend && npm run dev"

echo Backend and frontend windows opened.
echo Frontend URL: http://localhost:%FRONTEND_PORT%/
endlocal