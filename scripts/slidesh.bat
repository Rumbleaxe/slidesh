@echo off
setlocal enabledelayedexpansion

REM slidesh - Dual-target presentation engine (Windows)
REM Usage: slidesh [mode] [file] [options]
REM        slidesh --mode cli|browser|pdf --theme <theme> <file>

set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%.."
set "NODE_PATH=%PROJECT_ROOT%\packages\cli\dist\index.js"

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    exit /b 1
)

REM Run the CLI with all arguments
node "%NODE_PATH%" %*
exit /b %ERRORLEVEL%
