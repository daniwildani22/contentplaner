$outputFile = "js\bundle.js"

$configContent = [System.IO.File]::ReadAllText((Resolve-Path "js\config.js").Path)
$configContent = [System.Text.RegularExpressions.Regex]::Replace($configContent, '(?m)^\s*export\s+(const|let|var)\s+', 'const ')

$supabaseContent = [System.IO.File]::ReadAllText((Resolve-Path "js\supabase-client.js").Path)
$supabaseContent = [System.Text.RegularExpressions.Regex]::Replace($supabaseContent, '(?m)^\s*import\s+[^;]+;\s*$', '// [import stripped]')
$supabaseContent = [System.Text.RegularExpressions.Regex]::Replace($supabaseContent, '(?m)^\s*export\s+(const|let|var|class)\s+', '$1 ')

$storeContent = [System.IO.File]::ReadAllText((Resolve-Path "js\store.js").Path)
$storeContent = [System.Text.RegularExpressions.Regex]::Replace($storeContent, '(?m)^\s*import\s+[^;]+;\s*$', '// [import stripped]')
$storeContent = [System.Text.RegularExpressions.Regex]::Replace($storeContent, '(?m)^\s*export\s+const\s+store\s*=', 'const store =')

$apiContent = [System.IO.File]::ReadAllText((Resolve-Path "js\api.js").Path)
$apiContent = [System.Text.RegularExpressions.Regex]::Replace($apiContent, '(?m)^\s*import\s+[^;]+;\s*$', '// [import stripped]')
$apiContent = [System.Text.RegularExpressions.Regex]::Replace($apiContent, '(?m)^\s*export\s+const\s+api\s*=', 'const api =')

$authContent = [System.IO.File]::ReadAllText((Resolve-Path "js\auth.js").Path)
$authContent = [System.Text.RegularExpressions.Regex]::Replace($authContent, '(?m)^\s*import\s+[^;]+;\s*$', '// [import stripped]')
$authContent = [System.Text.RegularExpressions.Regex]::Replace($authContent, '(?m)^\s*export\s+(const|let|var|class)\s+', '$1 ')

$viewFiles = @(
    "js\views\dashboard.js",
    "js\views\content.js",
    "js\views\calendar.js",
    "js\views\tasks.js",
    "js\views\production.js",
    "js\views\media.js",
    "js\views\social.js",
    "js\views\business.js",
    "js\views\finance.js",
    "js\views\timetracking.js",
    "js\views\targets.js",
    "js\views\reports.js",
    "js\views\notifications.js",
    "js\views\settings.js"
)

$viewsBundle = ""
foreach ($vf in $viewFiles) {
    $code = [System.IO.File]::ReadAllText((Resolve-Path $vf).Path)
    $code = [System.Text.RegularExpressions.Regex]::Replace($code, '(?m)^\s*import\s+[^;]+;\s*$', '// [import stripped]')
    
    # Extract exports
    $matches = [System.Text.RegularExpressions.Regex]::Matches($code, '(?m)^\s*export\s+(?:function|const|let|var|class)\s+([a-zA-Z0-9_$]+)')
    $exportNames = @()
    foreach ($m in $matches) {
        $exportNames += $m.Groups[1].Value
    }
    
    $code = [System.Text.RegularExpressions.Regex]::Replace($code, '(?m)^\s*export\s+(function|const|let|var|class)\s+', '$1 ')
    $returnObj = ($exportNames | ForEach-Object { $_ + ": " + $_ }) -join ", "
    $destructure = $exportNames -join ", "
    
    $viewsBundle += "`n// ==================== VIEW: $vf ====================`n"
    $viewsBundle += "const { $destructure } = (function() {`n$code`nreturn { $returnObj };`n})();`n"
}

$appContent = [System.IO.File]::ReadAllText((Resolve-Path "js\app.js").Path)
$appContent = [System.Text.RegularExpressions.Regex]::Replace($appContent, '(?m)^\s*import\s+[^;]+;\s*$', '// [import stripped]')
$appContent = [System.Text.RegularExpressions.Regex]::Replace($appContent, '(?m)^\s*export\s+(function|const|let|var|class)\s+', '$1 ')

$finalBundle = @"
/**
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - COMPLETE APPLICATION BUNDLE
 * Standalone Zero-Dependency Build (Works directly via file:/// and http://)
 * Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
 */
(function(window, document) {
'use strict';

// 1. CONFIGURATION
$configContent

// 2. SUPABASE REALTIME CLIENT
$supabaseContent

// 3. CENTRAL STORE
$storeContent

// 4. API CLIENT
$apiContent

// 5. AUTHENTICATION & ACCESS CONTROL (RBAC)
$authContent

// 6. VIEW MODULES
$viewsBundle

// 7. APPLICATION CONTROLLER & ROUTER
$appContent

})(window, document);
"@

[System.IO.File]::WriteAllText((Join-Path (Get-Location).Path $outputFile), $finalBundle, [System.Text.Encoding]::UTF8)
Write-Host "Complete standalone bundle built successfully: $outputFile ($( [System.IO.FileInfo]::new($outputFile).Length ) bytes)"
