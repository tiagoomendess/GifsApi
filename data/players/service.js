function PlayerService(PlayerModel) {

    let service = {
        create,
        findAll
    };

    function create(values) {
        let newPlayer = PlayerModel(values);
        return save(newPlayer);
    }

    function save(newPlayer) {
        return new Promise(function (resolve, reject) {
            newPlayer.save(function (err) {
                if (err) reject(err);

                resolve('Player created!');
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            PlayerModel.find({}, function (err, players) {
                if (err) reject(err);
                resolve(players);
            });
        });
    }

    function findOne(option, value) {
        return new Promise(function (resolve, reject) {
            PlayerModel.find( {option : value}, function (err, player) {
                if (err) reject(err);
                resolve(player);
            });
        });
    }

    function findById(id) {
        return new Promise(function (resolve, reject) {
            PlayerModel.findById(id, function (err, player) {
                if (err) return reject(err);
                resolve(player);
            });
        });
    }

    return service;

}

module.exports = PlayerService;