import alt    from 'alt-server';
import mysql  from 'mysql';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

var connection = mysql.createConnection ({
    host           : process.env['DATABASE_HOST'],
	user           : process.env['DATABASE_USER'],
	password       : process.env['DATABASE_PASSWORD'],
	database       : process.env['DATABASE_NAME'],
	connectionLimit: 2500
});

connection.connect(function(error) {
    if (error) {
        alt.log("[DATABASE] Database connection could not be established!".red);
    } else {
        alt.log("[DATABASE] Database connection could be established!".green);
    }
});

//@playerConnect
alt.on("playerConnect", (player) => {
    player.spawn(971.245, -1620.993, 30.111);
    player.model = 'mp_m_freemode_01';
    alt.log("[SERVER]".green + ` ${player.name} connected!`);
    alt.emitClient(player, "client:auth:load");
});

//@login
alt.onClient("server:auth:validate:data", (player, account_name, account_password) => {
    connection.query("SELECT * FROM server_accounts WHERE account_name = ? AND account_password = ?", [account_name, account_password], function(error, res) {
        if (res.length > 0) {
            alt.emitClient(player, "client:auth:success");
            alt.emitClient(null, "client:notification:show", `Welcome ${account_name}!`, false, 121);
        } else {
            alt.emitClient(null, "client:notification:show", "The given dates are not correct!", true, 162);
        }
    });
});

//@register
alt.onClient("server:auth:register:data", (player, account_name, account_password) => {
    connection.query("SELECT * FROM server_accounts WHERE account_name = ?", [account_name], function(error, res) {
        if (res.length > 0) {
            alt.emitClient(null, "client:notification:show", "Username already taken!", true, 162);
        } else {
            connection.query("INSERT INTO server_accounts SET account_name = ?, account_password = ?", [account_name, account_password], function(error, res) {
                if (res.length > 0) {
                    alt.emitClient(player, "client:auth:success");
                    alt.emitClient(null, "client:notification:show", `Registered!`, false, 121);
                }
            });
        }
    });
});

//@account counter
function logAccountCount() {
    connection.query("SELECT * FROM server_accounts", [], function(error, res=[]) {
        if (error) {
            alt.log("[ERROR]".red + " Failed: " + "logAccountCount".gray);
        }
        if (res.length > 0) {
            var accountCounter = 0;
            res.forEach(() => {
                accountCounter += 1;
            });
            alt.log("[DATABASE]".green + " Loaded Accounts: " + `${accountCounter}`.grey);
        }
    });
}

logAccountCount();

alt.log("[SERVER]".green + " Loaded: " + "authentification".green);