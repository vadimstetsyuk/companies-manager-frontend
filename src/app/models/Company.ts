/*
    The class that represents object of Company
*/

export class Company {
    id: Number;
    name: String;
    earnings: Number;
    fullEarnings: Number;
    children: Array<Company>;
}