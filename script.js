function getAllList() {
	let list = Array.from(document.querySelectorAll(".container .row"));
	return Array.from({length: list.length / 3}, (_, i) => list.slice(i * 3, i * 3 + 3));
}
function checkCol(list, res, rowCurrent, colCurrent) {
	let check1 = 0;
	let check2 = 0;
	for(let i = 0;i < colCurrent; i++) {
		if(list[rowCurrent][i].textContent == res) {
			check1++;
		}	
	}
	for(let i = colCurrent + 1;i < 3; i++) {
		if(list[rowCurrent][i].textContent == res) {
			check2++;
		}
	}
	return check1 == 2 || check2 == 2 || (check1 == check2 && check1 != 0);
}
function resetGame() {
	let list = document.querySelectorAll(".container .row");
	for(let i of list) {
		i.textContent = "";
		i.classList.remove("color-1");
		i.classList.remove("color-2");
	}
	let spanElement = document.querySelector(".text span");
	spanElement.textContent = "X";
	spanElement.classList.remove("color-2");
	spanElement.classList.add("color-1");
	let hidden = document.querySelector(".hidden");
	hidden.style.display = "none";
	let text1 = document.querySelector(".text1");
	text1.textContent = "";
	let buttonElement = document.querySelector("button");
	buttonElement.style.display = "none";
}
function checkRow(list, res, rowCurrent, colCurrent) {
	let check1 = 0;
	let check2 = 0;
	for(let i = rowCurrent + 1;i < 3; i++) {
		if(list[i][colCurrent].textContent == res) {
			check1++;
		}	
	}
	for(let i = 0;i < rowCurrent; i++) {
		if(list[i][colCurrent].textContent == res) {
			check2++;
		}
	}
	console.log(check1, check2 , rowCurrent, colCurrent);
	return check1 == 2 || check2 == 2 || (check1 == check2 && check1 != 0);
}
function checkDiagonal(list, res, rowCurrent, colCurrent) {
	let check1 = 0;
	let check2 = 0;
	let col1 = colCurrent + 1;
	let col2 = colCurrent - 1;
	let n = list.length	- 1;
		for(let i = rowCurrent - 1;i >= 0; i--) {
			if(col1 >= 0 && col1 < 3 && list[i][col1].textContent == res) {
				check1++;
			}
			col1++;	
		}
		for(let i = rowCurrent + 1;i <= n; i++) {
			if(col2 >= 0 && col2 < 3 && list[i][col2].textContent == res) {
				check2++;
			}
			col2--;
		}
	return check1 == 2 || check2 == 2 || (check1 == check2 && check1 != 0);
}
function checkDiagonal1(list, res, rowCurrent, colCurrent) {
	let check1 = 0;
	let check2 = 0;
	let n = list.length - 1;
	let col1 = colCurrent - 1;
	let col2 = colCurrent + 1;
	for(let i = rowCurrent + 1;i <= n; i++) {
		if(col2 >= 0 && col2 < 3 && list[i][col2].textContent == res) {
			check1++;
		}
		col2++;
	}
	for(let i = rowCurrent - 1;i >= 0; i--) {
		if(col1 >= 0 && col1 < 3 && list[i][col1].textContent == res) {
			check2++;
		}
		col1--;
	}
	return check1 == 2 || check2 == 2 || (check1 == check2 && check1 != 0);
}
function checkColRow(list,item) {
	for(let i in list) {
		for(let j in list[i]) {
			if(list[i][j] == item) {
				return [+i,+j];
			}
		}
	}
}
function checkNoWinNoLose(list) {
	for(let i of list) {
		for(let j of i) {
			if(j.textContent == "") {
				return false;
			}
		}
	}
	return true;
}
function listEvent() {
	let list = getAllList();
	for(let i of list) {
		for(let j of i) {
			j.addEventListener("click", () => {
				if(j.textContent != "") return;
				let textCurrent = document.querySelector(".text span");
				let res = textCurrent.textContent;
				if(res == "X") {
					j.classList.add("color-1");
				}else {
					j.classList.add("color-2");
				}
				j.textContent = res;
				textCurrent.textContent = res == "X" ? "O" : "X";
				if(textCurrent.textContent == "X") {
					textCurrent.classList.remove("color-2");
					textCurrent.classList.add("color-1");
				}else {
					textCurrent.classList.remove("color-1");
					textCurrent.classList.add("color-2");
				}
				let current = checkColRow(list,j);
				if(checkRow(list,res,current[0],current[1]) || checkCol(list,res,current[0],current[1]) || checkDiagonal(list,res,current[0],current[1]) || checkDiagonal1(list,res,current[0],current[1])) {
					console.log(checkRow(list,res,current[0],current[1]));
					console.log(checkDiagonal(list,res,current[0],current[1]));
					let hiddenElement = document.querySelector(".hidden");
					hiddenElement.style.display = "block";
					let text1 = document.querySelector(".text1");
					text1.textContent = "You Win (Thắng)!!";
					let buttonElement = document.querySelector("button");
					buttonElement.style.display = "block";
				}else if(checkNoWinNoLose(list)) {
					let hiddenElement = document.querySelector(".hidden");
					hiddenElement.style.display = "block";
					let text1 = document.querySelector(".text1");
					text1.textContent = "Tie (Hòa) !!";
					let buttonElement = document.querySelector("button");
					buttonElement.style.display = "block";
				}
			});
		}
	}
}
function buttonEvent() {
	let buttonElement = document.querySelector("button");
	buttonElement.addEventListener("click", () => {
		resetGame();
	});
}
(() => {
	listEvent();
	buttonEvent();
})();