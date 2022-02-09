export class Radiation {
  constructor(
    public Id: number,
    public Dose: number,
    public Level: number,
    public IdCity: number,
    public City: string,
    public IdUser: string,
    public User: string,
    public Date: string,
  ) { }
}
