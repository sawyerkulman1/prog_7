/**
 *   @author kulman, Sawyer  (Kulmans@gmail.com)
 *   @version 0.0.3
 *   @summary Proj 7 code || created: 12.16.2016
 *   @todo
 */
"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

const LAST_NAME = 0, FIRST_NAME = 1, CARD_NUM = 2, PIN = 3, CHECKING_BAL = 4, SAVING_BAL = 5;
const MAX_TRIES = 3;

let customerInfo = [];
let whichTask = null;
let withdrawMoney = 0, transferAmount = 0, depositMoney, cardNumber, accountPin, cardHolderNum;

function main() {
    populateCustomerInfo();
    while (1 > 0) {
        setCardHolderName();
        setCardNumber();
        setAccountPin();
        while (accountPin = 'yes' && whichTask == null) {
            setWhichTask();
            if (whichTask == 1) {
                setWithdrawMoney();
            } else if (whichTask == 2) {
                setDepositMoney();
            } else if (whichTask == 3) {
                setTransferFunds();
            } else if (whichTask == 4) {
                printInquireMoney();
            } else {
                printGoodbye();
            }
        }
    }
}

main();

function populateCustomerInfo() {
    let fileContents = IO.readFileSync(`Customerinfo_Project7.csv`, 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        customerInfo.push(lines[i].toString().split(/,/));
    }
}

function setCardHolderName() {
    while (typeof cardHolderNum === 'undefined' || isNaN(cardHolderNum) || cardHolderNum < 0 || cardHolderNum > customerInfo.length){
        for (let i = 0; i < customerInfo.length; i++) {
            console.log(`${i} = ${customerInfo[i][FIRST_NAME]} ${customerInfo[i][LAST_NAME]}`);
        }
        cardHolderNum = PROMPT.question(`\n\tPlease choose the number corresponding to your name: `);
    }
}

function setCardNumber() {
    while (typeof cardNumber === 'undefined' || isNaN(cardNumber) || cardNumber != customerInfo[cardHolderNum][CARD_NUM]) {
        cardNumber = PROMPT.question(`\n\tPlease enter the card number associated with your account: `);
    }
}

function setAccountPin() {
    let counter = 0;
    while (typeof accountPin =='undefined' || accountPin !== customerInfo[cardHolderNum][PIN] && counter < MAX_TRIES) {
        accountPin = PROMPT.question(`\n\tPlease enter your PIN: `);
        counter++
    }
    accountPin = 'yes'
}

function setWhichTask() {
    whichTask = PROMPT.question(`\n\tHello, ${customerInfo[cardHolderNum][FIRST_NAME]}, what would you like to do? \n\tWithdraw funds (press 1) \n\tDeposit funds (press 2) \n\tTransfer funds (press 3) \n\tSee the balance of your accounts (press 4) \n\tQuit (press 5)\n\t`);
}

function setWithdrawMoney() {
    let withdrawChoice;
    withdrawChoice = PROMPT.question(`\n\tWould you like to withdraw funds from your checking account(press 1) or savings account(press 2)? `);
    if (withdrawChoice == 1) {
        console.log(`\nchecking Balance = \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
        while (withdrawMoney == 0 || withdrawMoney > customerInfo[cardHolderNum][CHECKING_BAL]) {
            withdrawMoney = Number(PROMPT.question(`how much would you like to withdraw? `));
        }
        customerInfo[cardHolderNum][CHECKING_BAL] = customerInfo[cardHolderNum][CHECKING_BAL] - withdrawMoney;
        console.log(`New checking balance is \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
        whichTask = null;
        withdrawMoney = 0;
    } else {
        console.log(`\nSavings = \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
        while (withdrawMoney == 0 || withdrawMoney > customerInfo[cardHolderNum][SAVING_BAL]) {
            withdrawMoney = Number(PROMPT.question(`how much would you like to withdraw? `));
        }
        customerInfo[cardHolderNum][SAVING_BAL] = customerInfo[cardHolderNum][SAVING_BAL] - withdrawMoney;
        console.log(`New savings balance is \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
        whichTask = null;
        withdrawMoney = 0;
    }
}

function setDepositMoney() {
    let depositChoice;
    depositChoice = PROMPT.question(`\n\tWould you like to deposit funds into your checking account(press 1) or savings account(press 2)? `);
    if (depositChoice == 1) {
        console.log(`\nChecking Balance = \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
        depositMoney = Number(PROMPT.question(`How much money would you like to deposit? `));
        customerInfo[cardHolderNum][CHECKING_BAL] = Number(customerInfo[cardHolderNum][CHECKING_BAL]) + depositMoney;
        console.log(`New checking balance is \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
        whichTask = null;
    } else {
        console.log(`\nSavings = \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
        depositMoney = Number(PROMPT.question(`How much money would you like to deposit? `));
        customerInfo[cardHolderNum][SAVING_BAL] = Number(customerInfo[cardHolderNum][SAVING_BAL]) + depositMoney;
        console.log(`New savings balance is \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
        whichTask = null;
    }
}

function setTransferFunds() {
    let transferFrom;
    transferFrom = PROMPT.question(`\n\tWould you like to transfer funds FROM your checking account(press 1) or savings account(press 2)? `);
    if (transferFrom == 1) {
        console.log(`\nChecking Balance = \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
        console.log(`\nSavings Balance = \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
        while (transferAmount == 0 || transferAmount > customerInfo[cardHolderNum][CHECKING_BAL]) {
            transferAmount = Number(PROMPT.question(`How much money would you like to transfer? `));
        }
        customerInfo[cardHolderNum][CHECKING_BAL] = Number(customerInfo[cardHolderNum][CHECKING_BAL]) - transferAmount;
        customerInfo[cardHolderNum][SAVING_BAL] = Number(customerInfo[cardHolderNum][SAVING_BAL]) + transferAmount;
        console.log(`New checking balance is \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
        console.log(`New savings balance is \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
        whichTask = null;
        transferAmount = 0;
    } else if (transferFrom == 2) {
        console.log(`\nSavings balance = \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
        console.log(`\nChecking balance = \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
        while (transferAmount == 0 || transferAmount > customerInfo[cardHolderNum][SAVING_BAL]) {
            transferAmount = Number(PROMPT.question(`How much money would you like to transfer? `));
        }
        customerInfo[cardHolderNum][SAVING_BAL] = Number(customerInfo[cardHolderNum][SAVING_BAL]) - transferAmount;
        customerInfo[cardHolderNum][CHECKING_BAL] = Number(customerInfo[cardHolderNum][CHECKING_BAL]) + transferAmount;
        console.log(`New savings balance is \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
        console.log(`New checking balance is \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
        whichTask = null;
        transferAmount = 0;
    } else {
        console.log('Try Again');
        return setTransferFunds();
    }
}

function printInquireMoney() {
    console.log(`Checking balance is \$${customerInfo[cardHolderNum][CHECKING_BAL]}`);
    console.log(`Savings balance is \$${customerInfo[cardHolderNum][SAVING_BAL]}`);
    whichTask = null;
}

function printGoodbye() {
    console.log(`\nThank you for your business, ${customerInfo[cardHolderNum][FIRST_NAME]} ${customerInfo[cardHolderNum][LAST_NAME]}`);
    cardHolderNum = 'undefined'; cardNumber = 'undefined'; accountPin = 'undefined'
}