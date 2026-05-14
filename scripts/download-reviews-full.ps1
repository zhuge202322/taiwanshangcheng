$ErrorActionPreference = 'Continue'
$root = "$PSScriptRoot\..\public\reviews"
New-Item -ItemType Directory -Force -Path "$root\products" | Out-Null
New-Item -ItemType Directory -Force -Path "$root\avatars"  | Out-Null

function Download($url, $dest) {
  if (Test-Path $dest) { return }
  Write-Host "  -> $(Split-Path $dest -Leaf)"
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -UserAgent 'Mozilla/5.0' -TimeoutSec 30
  } catch { Write-Host "     FAILED: $($_.Exception.Message)" }
}

# Each entry: slug, productImageUrl, reviewerUrls[]
$blocks = @(
  @{ slug='allergy-probiotic'; product='https://healthformula.com.tw/wp-content/uploads/2024/06/%E7%94%A2%E5%93%81%EF%BC%BF%E8%88%92%E6%95%8F_%E5%8E%BB%E8%83%8C.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%80%A3O%E5%87%B1-1-r2094xtsrlxhdgel7e6zph6rs433vys83ic7zzm1fc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%90%B3O%E6%B5%A9-r20a62gaq0r7yyh2efyh73w8i131xk6j7a0ofgk7nc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%A8%B1O%E7%91%80-e1740476381466-r20ql5aodhwcrfwcwxus4y94arqc9kq2guimlg5uwo.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%83%A1O%E6%BA%A2-e1740476478104-r20qnoh0sfd61m7x4j9lct8tx58y07s15dsq5aeo54.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%AB%98O%E6%99%B4-r20ahj3g2ag3jrtogwbp3prla6l6soop40eu3xkdrs.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%B1%9FO%E6%BE%94-r20ajrxke1ira8k9cv9m25d8dbir6nlm34ildq8iwo.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E5%A6%8D-r20alphmfs5z5dr82pc06ntcbtzx099r0osiw7de48.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9B%BEO%E6%A4%8D-r20an8y3n09w6dio2vazrrtjdkekmedwwba67j35x4.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%BB%83O%E5%A6%AE-r20aoy1lz8lj511x63pqruehzm1fiq4gspoqeikkoo.jpg'
  )},
  @{ slug='lutein'; product='https://healthformula.com.tw/wp-content/uploads/2024/06/%E7%94%A2%E5%93%81_%E8%91%89%E9%BB%83%E7%B4%A0_%E5%8E%BB%E8%83%8C.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B3O%E8%B1%AA-r20bf04jfw9ozv7b0d7ew9oiu5lqwnkl1orbcnxo6w.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E7%BE%A4-r20bh72zdz9s340m7bc2ppr8qiskv8a1cjk3nwolo8.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%8A%89O%E8%BE%B0-r20bj2rd21ufb1ab84l7p8ofi9j09fqpluj27tw988.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E7%A7%80-r20bl9pt04uiea3mf2pvior5empu80g5wpbuj2n6pk.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E9%BE%8D-r20bms8g0ix53nwfkqa8jazvuz94mgglg760d4ecoo.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E7%9A%93-e1740476539612-r20qp9t6dbjnptwmtq1u2wry5nec1r3np9lcf61nlk.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9D%9CO%E6%99%B4-e1740476589930-r20qqjv9o7apiq1qcryjz35j9j3bix6i7lk4xq5d4o.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E7%B7%AF-e1740476562676-r20qpvfgqid94v18bhe969bjtifryshhg8ligj5lmg.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%91%82O%E5%85%83-r20bzh20a0ahu5gvh7qx73pwk8pijcu5707zlll0oo.jpg'
  )},
  @{ slug='probiotic'; product='https://healthformula.com.tw/wp-content/uploads/2024/06/%E7%94%A2%E5%93%81_%E8%85%B8%E9%81%93_%E5%8E%BB%E8%83%8C.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%94%A3O%E6%BE%84-e1740476684990-r20qt31m34riswdakddd6y58vwlx9k8gw4u8hke6d4.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%AB%98O%E7%90%B3-e1740476705679-r20qtj0vbbdea9q2z2a0vc42zgf5wezwmbxhn9qhfc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B3O%E5%A8%81-r20nys9ya8q38oypx5h2trh9g8ttjg44tstu7g2njs.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%95%ADO%E5%90%9B-r20o24lal1asis3yelhbox49hkcswpdrycbzmv49fc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9D%8EO%E9%A1%A5-r20o5knzn60n3b3qa342u1t3wfd94r2cfeg2ze0am0.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%82%B1O%E8%87%A3-r20o86numllbcbb717qrre37ayhyihfi4bomz24xbs.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B3O%E5%B0%B9-e1740476648945-r20qs57f93h76xqg1yqsp6oni18pkgi4rhcr7lscl4.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9C%B1O%E5%9C%8B-r20oo8qldpknohzi9nmbuu7omxcp0c6fbsw948bt14.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E5%82%91-r20oqfp1bskqrqstglqzoaaejajiywvvmnp1fh2qig.jpg'
  )},
  @{ slug='fishoil'; product='https://healthformula.com.tw/wp-content/uploads/2024/06/%E7%94%A2%E5%93%81_%E9%AD%9A%E6%B2%B9_%E5%8E%BB%E8%83%8C.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%94%A1O%E5%82%91-r21vljep0gyum5cutma70w0a3cs7eqwbsb580l3np4.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%A8%B1O%E6%88%90-r21vovq1b9jjw8i3b2afw1na4ob6s05ywundg059ko.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9D%9CO%E9%99%BD-e1740553404289-r22ag8vismxx4inxi8yyxggzd7a148ndmv5v26aa48.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%90%B3O%E6%97%97-r21vsxf0ql2zvsmgob9m4ivq7ed2x38d4vrmtw58s8.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E8%AB%BA-r21vu7h41gu1oork7d6c0p9bba22e9b7n7qfcg8ybc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%8A%89O%E5%BB%B7-e1740553509969-r22aixowckmgccraswtjka1gjw0u52bqc6cvhoaqbc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%BB%83O%E5%AE%87-r21vyldzxmu7v6e6l9fnnler40fqbeq48xbzyxqta0.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%90%B3O%E5%BB%B7-r21vzqqwaceu20q3vrb8paz18yrvq3ab2m1d341ho8.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E7%9F%B3O%E9%9D%88-r21w1xpc8fex59jf2pfwir1r5byponzrdgu5ecsf5k.jpg'
  )},
  @{ slug='uc2'; product='https://healthformula.com.tw/wp-content/uploads/2024/07/UC2-%E9%9D%9E%E8%AE%8A%E6%80%A7%E4%BA%8C%E5%9E%8B%E8%86%A0%E5%8E%9F%E8%9B%8B%E7%99%BD-1.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%B8%B8O%E6%98%8C-r21wa3wtnklo37o2cqm4p6t12xollxfqtx14lyo720.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%8A%89O%E8%B2%9E-r21wbfulc4fajbqfktc3qcpjdl4bihq20iaw32p48o.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%87%91O%E8%8B%B1-e1740553858949-r22as3m8zf63jhg2adfldgs924uo6tpiljcaxspjnc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E9%9B%84-r21wef06z8hzaves73nkmlo33ig5vzjgf8o8sma8jc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E7%8E%8BO%E5%A6%B9-r21wftrh8afgptd1yplfd8uz6bhzfn4ym7wgpk6z7c.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9B%BEO%E6%88%90-r21wojpkmyd8fkp11hati1mxl0ikujrb5dsmzz9hh4.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B3O%E7%90%B3-r21wrg1npkc28ahh48eeotb3is8bky9ijq7j9oysag.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%A8%B1O%E6%A2%85-e1740554415159-r22b6laoch08j2eao4xjbb52qzfduu8jl9esad81q0.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E8%AC%99-e1740554313470-r22b3zatd1fka26tx0audyuzcgaoh3vdwc68ap3f08.jpg'
  )},
  @{ slug='royaljelly'; product='https://healthformula.com.tw/wp-content/uploads/2024/06/%E7%94%A2%E5%93%81_%E8%9C%82%E7%8E%8B%E4%B9%B3_%E5%8E%BB%E8%83%8C.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9D%9CO%E5%A8%A5-e1740554442503-r22b7cjzuo1jvrap8ypptm9fz5p1228rd0bv7e3mpk.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B3O%E7%8F%A0-r21xeg5gyltocr2lsocq7ic6v8uoyal1dkyb2guy0o.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%91%A8O%E5%A6%A4-e1740554462706-r22b7uexgiq00ckrcofmmzr79h904b7nrgq3bnd5fc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E8%8A%AC-r21xhpnaowaio0bxql53d6ot4erkogjhhqi0220qew.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%80%A3O%E7%90%8D-r21xillt59i9mr1ijyyepymhbie1y62cy4oidgpcjc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9D%9CO%E8%93%81-e1740554554230-r22ba8w2xa0doh35bptb0dxlwxersgqyrcqrh3sxiw.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%90%B3O%E6%83%A0-r21xmgpx8qspd1ffzn36yzip8jcdldemt98deez2yg.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E7%8E%8BO%E9%9B%B2-e1740554648953-r22bcob2kvc1o7k659lly9vh5rfwobe03dex3u7bg8.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B3O%E7%8E%89-e1740554667227-r22bd4abt1xx5kwyjyi9mnub9b95b65ftki69jjmig.jpg'
  )},
  @{ slug='vitamin-bm'; product='https://healthformula.com.tw/wp-content/uploads/2024/08/B%E7%BE%A4%E7%94%A2%E5%93%81%E5%9C%96-01.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%AC%9DO%E8%AB%BA-scaled-e1740623805451-r23pif39w19fk6m6vb51i3n04p5qvj2fcz4a3at41k.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%90%B3O%E6%AF%85-r234cw6gy2shh8rvn4w6f9p2gmmcrdv4nrwn2zxh2w.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%84%A7O%E5%8B%9B-r234duyhyy43etdd01xdhix4fvuxo6p74k1lu8hwoo.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%94%A3O%E6%96%87-r234etqiztfpcdyucyykjs56f53ikzj9lc6klh2cag.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E4%B8%81O%E6%AF%85-e1740623841547-r23pjbzmj8igujaej7czfdc4x6nlcxp15hy9vzgbzs.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%A2%81O%E5%92%8C-e1740623882462-r23pkdl64lxxqxrsfnm273ukoli9wtuamo1p31wl2w.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9D%8EO%E5%A9%B7-e1740623953288-r23pm99jsoikyv1hggv76mrrgc8pb1ayvz0nmz48mw.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%A5%8AO%E7%9D%BF-e1740623904775-r23pkz7ghsrj5ywdxeyhage6cgjptv84dn1v4f0j3s.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9D%8EO%E9%BE%8D-e1740623973856-r23pms2bld8bf2a6eozqki0zc1o1kzdlmk2d8icd6g.jpg'
  )},
  @{ slug='vitamin-bf'; product='https://healthformula.com.tw/wp-content/uploads/2024/08/B%E7%BE%A4%E9%90%B5%E7%84%A1%E8%83%8C%E6%99%AF_0-1.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%84%ADO%E6%99%B4-r234x0w1bcck4lj73c5jbotggpecm0s6few03c2xtk.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E7%8E%B2-e1740624131543-r23pqwktl6vmdgagbh6sigjt6xc1d5r6uz532885vc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%94%A1O%E9%9C%8F-e1740624192178-r23pshwz63241nz60nz18k2xffhfep2teuxpc3v5bs.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BE%90O%E8%80%98-e1740624274278-r23pumzqqhzmhov7ilafx0mq50xixvkt1gfiosov5k.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E7%8F%8A-e1740624347431-r23pwjlylelk183jdwy7h1bdi5jbjs57mw1ypzv4jc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%BB%83O%E7%9C%9F-r23541qmdryovpbx2vg6gf0g9cs34lnz26dm6ro1bs.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E7%8F%8D-r2355o0m5i6gviz9mkn1r0b138sudu3by6tpxx9mm0.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%B4%AAO%E6%99%B4-r2356y2pgdxiof4d5mjrn6om74htv066gisighdc54.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%8E%8AO%E7%B6%BA-e1740624384540-r23pxhg5ffvvn6qdwbkrysryw0wj8vvjrjjfzygybc.jpg'
  )},
  @{ slug='gaba-complex'; product='https://healthformula.com.tw/wp-content/uploads/2024/08/%E5%A5%97%E7%89%88%E9%99%B0%E5%BD%B1-01.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E6%B3%B0-r235hezzky9i01wv0nh5x1kgemw0lmqjkce7wfugu0.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%80%A3O%E8%B1%AA-r235hr7w1sq86zf41arbbghg4n7sdp31y0vj51ccl4.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9D%8EO%E5%BF%97-r235i5bgwb9j14umqyupuuxd1faal5n0zyntc6rfzs.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%8A%89O%E6%A9%8B-r235iqxr9i34g5z88q74y7gypabqi70uqxnzdjve0o.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%BB%83O%E6%81%A9-r235ji72rp4fsuvmtjzbgilbxgldpf12iol2akqz08.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9B%B2O%E5%8B%A4-r235k1xor7vgko2ymaihevm0ejw3727flea9ddxpdk.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E4%B8%81O%E8%8B%B1-e1740624461878-r23pzhtq1omyh5t95ov1ssigmozspkuvphrty9hn08.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B3O%E8%8F%AF-e1740624421648-r23pyh60n58rwdai3r0lljrhgo0hddtckgbw8gzzqw.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E9%BA%92-r235mpt84bipgw7p2fyfh7f0zurj06s1yktsblzjqw.jpg'
  )},
  @{ slug='ca'; product='https://healthformula.com.tw/wp-content/uploads/2024/11/%E6%B5%B7%E8%97%BB%E9%88%A3.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E7%8B%82-r23qyvh1a72hgsf7khej5d41jsm5fgb68lqr8716t4.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%B0%A4O%E5%AE%9C-r23lrl4pjkoq5ugu70zlu4ioixqaqjsjhm8vueq4l4.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%94%A1O%E5%A5%B3-r23ls2zn5fd6afqwaqpini0ft9a9ssrfw2n3ynznaw.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B8O%E5%92%8C-r23lsjwqkg0c3f2bjy0swdqqi6yvncmlyedulnak6w.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2-2025-03-04-101704-r2ce0qjzdc3ldewfwtknfmen67rsi31v4vqui3uks8.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E6%96%87-e1740626147794-r23r7ilm4cwe7pva3pw1kolm6c0n79mbrdoh2s7vlk.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9E%97O%E8%8F%AF-r23lu74kj09eeuoay5margsrxgv04a5p6jhfu2uraw.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%99%B3O%E7%8E%B2-r23lum5zkctzkm2gic4bvd05fmsvjfteklx7ii8gjc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%8A%89O%E7%8E%89-r23lv8q44dovb95oulvdj7b7ovpoo6aynpkv15b0e0.jpg'
  )},
  @{ slug='collagen'; product='https://healthformula.com.tw/wp-content/uploads/2024/12/%E8%86%A0%E5%8E%9F%E8%9B%8B%E7%99%BD-%E5%8E%BB%E8%83%8C.png'; reviewers=@(
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E7%B5%A8-r23mbwf58oht2gylkt3cpzzaoplv32fpm5sn7olu48.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E6%85%A7-e1740626173649-r23r871f21tulkvs50gcdiflmco6rebciqn3jz7n3s.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%83%ADO%E6%B1%9D-e1740626193260-r23r8pu6uqjl1s4h38kvrdoti23j1cdz9bot5ifrnc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%BB%83O%E7%B4%94-r23mdnebykw0ocf4d2bcv236hizgesdq6ti6d80gjc.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E9%BB%83O%E4%BB%A5-e1740626214236-r23r99ksu9altlbsvz41pqphz5e8izkcc1e08bmi0o.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%B8%B8O%E5%AE%A3-r23mflw875kiv3kpxesdk2ar1fbzg35lgiflcz3xko.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E5%84%80-r23mgf1830oev0ee79dt7cy1gdcd2pd9winn8jwq7s.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E5%BC%B5O%E7%91%84-e1740626271243-r23rar5lntby7d5z749s5v6ru425pqh1jekol3f260.jpg',
    'https://healthformula.com.tw/wp-content/uploads/elementor/thumbs/%E6%9B%BEO%E9%BD%A1-e1740626249967-r23ra7ezoakxfjynedqm7i63d0rg83aogovhia8bso.jpg'
  )}
)

foreach ($b in $blocks) {
  $slug = $b.slug
  Write-Host "[$slug]"
  Download $b.product (Join-Path "$root\products" "$slug.png")
  for ($i = 0; $i -lt $b.reviewers.Count; $i++) {
    Download $b.reviewers[$i] (Join-Path "$root\avatars" ("{0}-{1}.jpg" -f $slug, ($i+1)))
  }
}

Write-Host ""
Write-Host "Products:"
Get-ChildItem "$root\products" | Select-Object Name, @{N='KB';E={[int]($_.Length/1024)}} | Format-Table
Write-Host "Avatars:"
Get-ChildItem "$root\avatars" | Measure-Object | ForEach-Object { Write-Host "  count: $($_.Count)" }
