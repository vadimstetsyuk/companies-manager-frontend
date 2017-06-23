/*
    The class which represents object of Company
*/

export class Company {
    id: Number;
    parentId: Number;
    name: String;
    earnings: number;
    fullEarnings: number;
    child: Array<Company>;

    constructor(id: Number, parentId: Number, name: String, earnings: number, fullEarnings: number, child: Array<Company>) {
        this.id = id;
        this.parentId = id;
        this.name = name;
        this.earnings = earnings;
        this.fullEarnings = fullEarnings;
        this.child = child;
    }

    /*
        Getters
    */
    public getId(): Number {
        return this.id;
    }

    public getParentId(): Number {
        return this.parentId;
    }

    public getName(): String {
        return this.name;
    }

    public getEarnings(): number {
        return this.earnings;
    }

    public getFullEarnings(): number {
        return this.fullEarnings;
    }

    public getChild(): Array<Company> {
        return this.child;
    }

    /*
        Setters
    */
    public setId(id: Number): void {
        this.id = id;
    }

    public setParentId(parentId: Number): void {
        this.parentId = parentId;
    }

    public setName(name: String): void {
        this.name = name;
    }

    public setEarnings(earnings: number): void {
        this.earnings = earnings;
    }

    public setFullEarnings(fullEarnings: number): void {
        this.fullEarnings = fullEarnings;
    }

    public setChild(child: Array<Company>): void {
        this.child = child;
    }
}