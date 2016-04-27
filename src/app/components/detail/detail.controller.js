import moment from 'moment';

export default class DetailController {
    constructor($stateParams, TeamService) {

        TeamService.getDetail($stateParams.id)
            .then((response) => {
                this.member = response;

                let currentDate = moment(new Date());
                let memberDate = moment(this.member.entryDate);

                this.member.days = currentDate.diff(memberDate, 'days') 


            });


    }
}
