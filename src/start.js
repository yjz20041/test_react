const path = require('path');
const logFolder = 'logs';
const pm2 = require('pm2');
const MAX_MEMORY = 512;
const NAME = 'repository-backend2';

pm2.connect(function (err) {
    if (err) {
        console.error(err);
        return process.exit(2);
    }

    pm2.start({
        'name': NAME,
        'script': path.join(__dirname, './test2.js'),   // Script
        'exec_mode': 'cluster',        // Allows your app to be clustered
        'instances': -1,               // MAX
        'cwd': path.join(__dirname, '../..'),
        'error_file': path.join(logFolder, 'err.log'),
        'out_file': path.join(logFolder, 'out.log'),
        'pid_file': path.join(logFolder, 'app.pid'),
        'max_memory_restart': MAX_MEMORY + 'M',   // 假设512M就进行重启
        'env': {
            'NODE_ENV': 'production'
        }

    }, function (err, apps) {
        if (err) {
            return console.error(
                'Error while launching applications', err.stack || err
            );
        }
        console.log(
            `PM2 and application [${NAME}] has been succesfully started`
        );

        // Display logs in standard output
        pm2.launchBus(function (err, bus) {
            console.log('[PM2] Log streaming started');

            bus.on('log:out', function (packet) {
                console.log('[App:%s] %s', packet.process.name, packet.data);
            });

            bus.on('log:err', function (packet) {
                console.error(
                    '[App:%s][Err] %s', packet.process.name, packet.data
                );
            });
        });
    });
});

function stopPM(code) {
    console.log(22222);
    pm2.delete(NAME, function (err) {
        if (err) console.error('PM2 stop errored', err)
        process.exit(0);
    })

}


process.on('SIGINT', stopPM.bind(null, 2))
process.on('SIGTERM', stopPM.bind(null, 15))
process.on('exit', function (code) {
    console.log('' + new Date + ' Exit ' + NAME + ' with %s', code);
})

