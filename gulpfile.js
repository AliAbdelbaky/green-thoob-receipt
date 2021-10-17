const gulp = require("gulp"),
    // Concat Plugin
    concat = require("gulp-concat"),
    // Autoprefixer Plugin
    prefix = require("gulp-autoprefixer"),
    // Sass Plugin
    sass = require("gulp-sass"),
    // PugJs Plugin
    pug = require("gulp-pug"),
    // Sourcemaps Plugin
    sourcemaps = require("gulp-sourcemaps"),
    //uglify Plugin
    uglify = require("gulp-uglify"),
    //Notify Plugin
    notify = require("gulp-notify"),
    //Compress Plugin
    compress = require("gulp-zip");
//- HTML TASK
gulp.task("Html", () => {
    return gulp
        .src("./stage/html/*.pug")
        .pipe(
            pug({
                pretty: true,
            })
        )
        .pipe(gulp.dest("./dist"))
        .pipe(notify("You Html Is Ready!"));
});
//- CSS TASK
gulp.task("Css", () => {
    return gulp
        .src(["./stage/css/**/*.css", "./stage/css/**/*.sass"])
        .pipe(sourcemaps.init()) //init sourceMap
        .pipe(sass({ outputStyle: "compressed" })) // The Plugine
        .pipe(prefix("last 2 versions")) // The Plugine
        .pipe(concat("all.css")) // The Plugine
        .pipe(sourcemaps.write("./")) // Write SourceMap
        .pipe(gulp.dest("dist/css")) // Files Destination
        .pipe(notify("Your Sass is Ready")); // Notify
});
//- JS TASK
gulp.task("js", () => {
    return gulp
        .src(["./stage/js/libs/*.js", "./stage/js/app/*.js"])
        .pipe(concat("main.js")) // The Plugine
        .pipe(uglify()) // uglify files
        .pipe(gulp.dest("./stage/js/all"))
        .pipe(notify("Your Js Is Ready!"));
});
gulp.task("js-two", () => {
    return gulp
        .src(["./stage/js/select-flight-page/libs/*.js", "./stage/js/select-flight-page/app/*.js"])
        .pipe(concat("select_flight.js")) // The Plugine
        .pipe(uglify()) // uglify files
        .pipe(gulp.dest("./stage/js/all"))
        .pipe(notify("Your Js Is Ready!"));
});
gulp.task("js-three", () => {
    return gulp
        .src(["./stage/js/final-step-page/libs/*.js", "./stage/js/final-step-page/app/*.js"])
        .pipe(concat("final_step.js")) // The Plugine
        .pipe(uglify()) // uglify files
        .pipe(gulp.dest("./stage/js/all"))
        .pipe(notify("Your Js Is Ready!"));
});
//- JS RELOCATE
gulp.task("js-relocate", () => {
    return gulp
        .src("./stage/js/all/*.js")
        .pipe(gulp.dest("./dist/js"))
        .pipe(notify("Js Relocated Successfully"));
});
//- ASSETS TASK
gulp.task("assets", () => {
    return gulp
        .src("./stage/assets/*.*")
        .pipe(gulp.dest("./dist/img"))
        .pipe(notify("Your Images Is Ready!"));
});
//Compress Task
gulp.task('compress', function() {
    return gulp.src('./dist/**/*.*')
        .pipe(compress('airport-website.zip'))
        .pipe(gulp.dest('./Comperssed'))
        .pipe(notify('Files Has been Compressed'))
});
//- WATCH TASK
gulp.task("watch", () => {
    gulp.watch("./stage/html/**/*.pug", gulp.series("Html"));
    gulp.watch(
        ["./stage/css/**/*.css", "./stage/css/**/*.sass"],
        gulp.series("Css")
    );
    gulp.watch(
        ["./stage/js/select-flight-page/libs/*.js", "./stage/js/select-flight-page/app/*.js"],
        gulp.series("js-two")
    );
    gulp.watch(
        ["./stage/js/final-step-page/libs/*.js", "./stage/js/final-step-page/app/*.js"],
        gulp.series("js-three")
    );
    gulp.watch(
        ["./stage/js/libs/*.js", "./stage/js/app/*.js"],
        gulp.series("js")
    );
    gulp.watch("./stage/js/all/*.js", gulp.series("js-relocate"));
    gulp.watch("./stage/assets/**/*.*", gulp.series("assets"));
});
