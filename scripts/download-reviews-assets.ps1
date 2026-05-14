$ErrorActionPreference = 'Stop'
$out = "$PSScriptRoot\..\public\reviews"
New-Item -ItemType Directory -Force -Path $out | Out-Null

$assets = @{
  'banner-01.jpg'    = 'https://healthformula.com.tw/wp-content/uploads/2024/06/%E8%A9%95%E8%AB%96-Banner-01.jpg'
  'banner-02.jpg'    = 'https://healthformula.com.tw/wp-content/uploads/2024/06/%E8%A9%95%E8%AB%96-Banner-02.jpg'
  'banner-03.jpg'    = 'https://healthformula.com.tw/wp-content/uploads/2024/06/%E8%A9%95%E8%AB%96-Banner-03.jpg'
  'icon-allergy.jpg' = 'https://healthformula.com.tw/wp-content/uploads/2024/06/Button_%E8%88%92%E6%95%8F%E7%9B%8A%E7%94%9F%E8%8F%8C.jpg'
  'icon-lutein.jpg'  = 'https://healthformula.com.tw/wp-content/uploads/2024/06/Button_%E8%91%89%E9%BB%83%E7%B4%A0.jpg'
  'icon-probiotic.jpg' = 'https://healthformula.com.tw/wp-content/uploads/2024/06/Button_%E8%85%B8%E9%81%93%E7%9B%8A%E7%94%9F%E8%8F%8C.jpg'
  'icon-fishoil.jpg' = 'https://healthformula.com.tw/wp-content/uploads/2024/06/Button_%E9%AD%9A%E6%B2%B9.jpg'
  'icon-uc2.jpg'     = 'https://healthformula.com.tw/wp-content/uploads/2024/06/Button_UC2.jpg'
  'icon-royaljelly.jpg' = 'https://healthformula.com.tw/wp-content/uploads/2024/06/Button_%E8%9C%82%E7%8E%8B%E4%B9%B3.jpg'
  'icon-vitamin-bm.jpg' = 'https://healthformula.com.tw/wp-content/uploads/2024/08/%E5%9C%96%E7%89%871.png'
  'icon-vitamin-bf.png' = 'https://healthformula.com.tw/wp-content/uploads/2025/01/%E5%A5%B3b-ICON.png'
  'icon-gaba.jpg'    = 'https://healthformula.com.tw/wp-content/uploads/2024/08/Gbid.jpg'
  'icon-ca.jpg'      = 'https://healthformula.com.tw/wp-content/uploads/2024/11/%E6%B5%B7%E8%97%BB%E9%88%A3.jpg'
  'icon-collagen.jpg' = 'https://healthformula.com.tw/wp-content/uploads/2025/01/%E8%86%A0%E5%8E%9F-ICON.jpg'
  'product-allergy.png' = 'https://healthformula.com.tw/wp-content/uploads/2024/06/%E7%94%A2%E5%93%81%EF%BC%BF%E8%88%92%E6%95%8F_%E5%8E%BB%E8%83%8C.png'
}

foreach ($k in $assets.Keys) {
  $url = $assets[$k]
  $dest = Join-Path $out $k
  Write-Host "→ $k"
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -UserAgent 'Mozilla/5.0' -TimeoutSec 30
  } catch {
    Write-Host "   failed: $($_.Exception.Message)"
  }
}

Write-Host "Done. Files:"
Get-ChildItem $out | Select-Object Name, Length | Format-Table
