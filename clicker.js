let cookies = 0;
let cps = 0;
let amounts = [0, 0, 0, 0, 0];
const initialPrices = [10, 100, 1000, 10000, 100000]
let prices = [10, 100, 1000, 10000, 100000]
let upgradesUnlocked = [0, 0, 0, 0, 0]
let upgradesBought = [0, 0, 0, 0 , 0]
let multipliers = [1, 1, 1, 1, 1]
const upgradeRequirements = [10, 25, 50, 100]
let imgSrc = [
	"https://freesvg.org/img/hand_isometric.png",
	"https://image.freepik.com/free-vector/sweet-grandma-s-cookies_61841-341.jpg",
	"https://thumbs.dreamstime.com/b/wheat-field-blue-sunny-sky-square-format-wheat-field-blue-sunny-sky-square-format-warm-soft-look-134369034.jpg",
	"https://image.freepik.com/free-vector/mine-rock-mining-pickaxe-hits-stone-wooden-trolley-with-coal-flat-illustration-isolated-white-background_124715-654.jpg",
	"https://www.vippng.com/png/detail/505-5057634_cape-town-based-fabrication-company-factory-cartoon-transparent.png"
]
let itemTypes = ["cursor", "grandma", "farm", "mine", "factory"]
let goldenCookieTimeout = randomBetween(60, 300)
let goldenCookieMultiplier = 1

function randomBetween(first, last) {
  return (Math.round(Math.random() * (last - first)) + first)
}

function spawnGoldenCookie() {
	let goldenCookie = document.createElement("img")
	goldenCookie.src = "https://clipartix.com/wp-content/uploads/2016/04/Cookies-clipart-free-clipart-images.png"
	goldenCookie.id = "goldenCookie"
	goldenCookie.setAttribute("class", "goldenCookie")
	goldenCookie.style.left = randomBetween(64, 1280)
	goldenCookie.style.top = randomBetween(64, 512)
	goldenCookie.setAttribute("onClick", "clickGoldenCookie()")
	document.getElementById("body").insertBefore(goldenCookie, null)
	goldenCookieTimeout = randomBetween(60, 300)
	function deleteGoldenCookie() {
		let deleteGoldenCookie = document.getElementById("goldenCookie")
		deleteGoldenCookie.parentNode.removeChild(deleteGoldenCookie)
	}
	setTimeout(deleteGoldenCookie, 10000)
}

function clickGoldenCookie(type) {
		goldenCookieMultiplier = 7
		function goldenCookieMultiplierReset() {goldenCookieMultiplier = 1}
		setTimeout(goldenCookieMultiplierReset, 7000)
		let goldenCookie = document.getElementById("goldenCookie")
		goldenCookie.parentNode.removeChild(goldenCookie)
}

function exportSave() {
	let allData = [Math.round(cookies), amounts.join("-"), prices.join("-"), upgradesUnlocked.join("-"), upgradesBought.join("-") , multipliers.join("-")]
	allData = allData.join("-")
	alert("save this code " + allData + "-")
}

function importSave() {
	let allData = prompt("paste the saved code")
	let values = []
	let temp = []
	for (i=0;i<=allData.length;i++) {
		if (allData.charAt(i) == "-") {
			values.push(temp.join(""))
			temp = []
		} else {
			temp.push(allData.charAt(i))
		}
	}
	cookies = parseInt(values[0]);
	document.getElementById("cookies").innerHTML = "cookies " + cookies.toFixed(1)
	for (i=1;i<6;i++) {
		amounts[i - 1] = parseInt(values[i])
	}
	for (i=6;i<11;i++) {
		prices[i - 6] = parseInt(values[i])
	}
	for (i=16;i<21;i++) {
		upgradesBought[i - 16] = parseInt(values[i])
	}
	for (i=21;i<26;i++) {
		multipliers[i - 21] = parseInt(values[i])
	}
	for (i=0;i<5;i++) {
		for (j=0;j<(parseInt(values[i + 11]) - parseInt(upgradesBought[i]));j++) {
			unlockUpgrade(i)
		}
	}
	document.getElementById("cursorAmount").innerHTML = "Amount " + amounts[0]
	document.getElementById("cursorPrice").innerHTML = "Price " + prices[0]
	document.getElementById("grandmaAmount").innerHTML = "Amount " + amounts[1]
	document.getElementById("grandmaPrice").innerHTML = "Price " + prices[1]
	document.getElementById("farmAmount").innerHTML = "Amount " + amounts[2]
	document.getElementById("farmPrice").innerHTML = "Price " + prices[2]
	document.getElementById("mineAmount").innerHTML = "Amount " + amounts[3]
	document.getElementById("minePrice").innerHTML = "Price " + prices[3]
	document.getElementById("factoryAmount").innerHTML = "Amount " + amounts[4]
	document.getElementById("factoryPrice").innerHTML = "Price " + prices[4]
}

function roundDecimal(number, decimals) {
    return Math.round(number * (10 ** decimals)) / (10 ** decimals)
}

function buyUpgrade(type, upgradeLevel, upgradePrice) {
	if (cookies >= upgradePrice) {
		let removeUpgrade = document.getElementById(itemTypes[type] + upgradeLevel)
		removeUpgrade.parentNode.removeChild(removeUpgrade)
		upgradesBought[type] += 1
		console.log(upgradesBought[type])
		multipliers[type] = (2 ** upgradesBought[type])
		cookiesAdd(-1 * upgradePrice)
	} else {
		alert("not enough cookies")
	}
}

function unlockUpgrade(type) {
	let upgradePrice = initialPrices[type] * (10 ** (upgradesUnlocked[type] + 1))
	let upgrade = document.createElement("div")
	let upgradeImg = document.createElement("img")
	let upgradeData = document.createElement("div")
	let upgradeDataPrice = document.createElement("p")
	upgradeDataPrice.innerHTML = "Price " + upgradePrice
	upgradeImg.className = "buyable"
	upgradeData.className = "buyableData"
	upgradeImg.src = imgSrc[type]
	upgrade.id = itemTypes[type] + upgradesUnlocked[type]
	upgradeImg.setAttribute("onClick","buyUpgrade(" + type + ", " + upgradesUnlocked[type] + ", " + upgradePrice + ")")
	upgrade.appendChild(upgradeImg)
	upgradeData.appendChild(upgradeDataPrice)
	upgrade.appendChild(upgradeData)
	document.getElementById("upgradeBox").appendChild(upgrade)
	upgradesUnlocked[type] += 1
}

function cookiesAdd(amount) {
	cookies += amount
	cookies = roundDecimal(cookies, 1)
	document.getElementById("cookies").innerHTML = "cookies " + cookies.toFixed(1)
}

function cpsAdd() {
	cps = (amounts[0] * 0.1 *multipliers[0] + amounts[1] *multipliers[1] + amounts[2] * 10 *multipliers[2] + amounts[3] * 100 *multipliers[3] + amounts[4] * 1000 *multipliers[4]) * goldenCookieMultiplier
	cps = roundDecimal(cps, 1)
	cookiesAdd(cps)
	document.getElementById("title").innerHTML = "cookies " + cookies.toFixed(0)
	document.getElementById("cps").innerHTML = "cookies per second " + cps.toFixed(1)
	goldenCookieTimeout--
	if (goldenCookieTimeout == 0) {
		spawnGoldenCookie()
	}
}

function cookieClick() {
	cookiesAdd(1 + roundDecimal(cps * multipliers[0] / 100, 1))
	document.getElementById("clickableCookie").setAttribute("class","smallCookie")
	function cookieWobble() {document.getElementById("clickableCookie").setAttribute("class","bigCookie")}
	setTimeout(cookieWobble, 100)
}

function buy(type) {
	if (cookies >= prices[type]) {
		cookiesAdd(prices[type] * -1)
		amounts[type]++
		prices[type] = Math.round(initialPrices[type] * (1.1 ** amounts[type]))
			document.getElementById("cursorAmount").innerHTML = "Amount " + amounts[0]
			document.getElementById("cursorPrice").innerHTML = "Price " + prices[0]
			document.getElementById("grandmaAmount").innerHTML = "Amount " + amounts[1]
			document.getElementById("grandmaPrice").innerHTML = "Price " + prices[1]
			document.getElementById("farmAmount").innerHTML = "Amount " + amounts[2]
			document.getElementById("farmPrice").innerHTML = "Price " + prices[2]
			document.getElementById("mineAmount").innerHTML = "Amount " + amounts[3]
			document.getElementById("minePrice").innerHTML = "Price " + prices[3]
			document.getElementById("factoryAmount").innerHTML = "Amount " + amounts[4]
			document.getElementById("factoryPrice").innerHTML = "Price " + prices[4]
		if (amounts[type] == upgradeRequirements[upgradesUnlocked[type]]) {
			unlockUpgrade(type)
		}
	} else {
		alert("not enough cookies")
	}
}

function selectColor() {
	let selectedColor = document.getElementById("selectColor").value
	let editables = document.getElementsByClassName("editableBackground")
	for (i=0;i<editables.length;i++) {
		let edit = editables[i]
		edit.classList.remove(edit.classList.item(edit.classList.length - 1))
		edit.classList.add(selectedColor)
	}
}

setInterval(cpsAdd, 1000)