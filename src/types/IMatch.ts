interface Team {
  _id: string,
  name: string,
  image: string,
  result: number
}
export interface IMatch {
  _id: string,
  group: string,
  date: Date,
  local_team: Team,
  visiting_team: Team,
  has_played: string
}