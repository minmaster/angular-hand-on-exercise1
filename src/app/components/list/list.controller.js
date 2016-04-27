export default class ListController {
    constructor(TeamService) {
        TeamService.getTeam()
            .then((response) => {
                this.team = response.members;
            })

    }
}
