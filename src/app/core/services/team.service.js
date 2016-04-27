export default class DataService {
    constructor($http, $q) {
        this.team = null;
        this.$http = $http;
        this.$q = $q;
    }
    getTeam() {
        return this.$http({method: 'GET', url: './assets/data/team.json'})
            .then((response) => {
                this.team = response.data.members;
                return this.$q.resolve(response.data)
            })
    }
    getDetail(id) {

        return this.getTeam()
            .then((response) => {
                this.team = response.members;
                let member;

                angular.forEach(this.team, (value, index) => {
                    if (value.id == id) {
                        member = value;
                    }
                });
                
                return this.$q.resolve(member);

            })
    }
}
