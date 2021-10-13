function tarea(done) {
    console.log('desde la primera tarea');
    // 'Done' es un callback de gulp qu le dice cuando acabar. Tmb vale 'fn' y 'callback'.
    done();
}
function tarea2(done) {
    console.log('desde la segunda tarea');
    done();
}

exports.tarea = tarea;
exports.tarea2 = tarea2;

// Ejecutar en terminal 'gulp tarea', 'gulp tarea2' para ejecutar funciones.