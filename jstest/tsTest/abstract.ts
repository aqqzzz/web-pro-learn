abstract class Department {
  constructor(public name: string) {

  }

  printName(): void {
    console.log("Department name is " + this.name)
  }

  abstract printMeeting(): void;
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing")
  }
  printMeeting(): void {
    console.log(' hello accounting department')
  }
  generateReports(): void {
    console.log('generate accounting reports')
  }
}

let department = new AccountingDepartment()
department.printMeeting()
department.printName()
department.generateReports()