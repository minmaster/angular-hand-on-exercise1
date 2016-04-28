export default class DetailController {
    constructor($stateParams, TeamService) {

        TeamService.getDetail($stateParams.id)
            .then((response) => {
                this.member = response;
                this.member.days = TeamService.getDays(this.member.entryDate);

            });


    }
}
