#!/usr/local/bin/node

const author = "Soon Fei";

const path = require("path");
(program = require("commander")),
  ({ cyan, red } = require("chalk")),
  (getRepoInfo = require("git-repo-info")),
  (git = require("simple-git/promise")),
  (exca = require("execa")),
  (del = require("delete")),
  (fs = require("fs-extra")),
  (psLookup = require("util").promisify(require("ps-node").lookup));

const log = (...arg) => console.log(cyan(...arg)),
  error = (...arg) => console.log(red(...arg)),
  generatePath = dir => path.relative(".", `${process.argv[1]}/../${dir}`);

const projectPathDeployOptions = {
    CFO: generatePath("amaccess-client-web"),
    BBO: generatePath("amaccess-backoffice-web")
  },
  projectBranch = {
    // 'dev': {
    //   'CFO': 'feature/mvp2.0-dev',
    //   'BBO': 'mvp2.0-dev',
    // },
    // branch with fixes that should go into uat
    master: {
      CFO: "master",
      BBO: "master"
    },
    "uat-dev": {
      CFO: "release/uat",
      BBO: "release/uat"
    },
    ftt: {
      CFO: "feature/ftt",
      BBO: "feature/ftt"
    },
    softToken: {
      CFO: "feature/softToken",
      BBO: "feature/softToken"
    },
    cheque: {
      CFO: "feature/cheque",
      BBO: "feature/cheque"
    },
    duitnow: {
      CFO: "feature/duitNow",
      BBO: "feature/duitNow"
    },
    "fraud-detection": {
      CFO: "feature/fraud",
      BBO: "feature/fraud"
    },
    quickfix: {
      CFO: "hotfix/quickfix",
      BBO: "hotfix/mvp2.3.3"
    },
    // branch with fixes that should go into uat
    uat2: {
      CFO: "hotfix/mvp2.3",
      BBO: "hotfix/mvp2.3"
    },
    // branch with fixes that should go into uat
    "uat-master": {
      CFO: "hotfix/mvp2.3",
      BBO: "hotfix/mvp2.3"
    },
    // MVP2.4.0 <BugFix>
    "mvp2.4.0": {
      CFO: "release/mvp2.4.0",
      BBO: "release/mvp2.4.0"
    },
    // MVP2.4.0.1 <BugFix>
    "mvp2.4.0.2": {
      // 'CFO': 'hotfix/mvp2.4.0.1',
      BBO: "hotfix/mvp2.4.0.2"
    }
  },
  projectOutputRepoBranch = {
    // 'dev': {
    //   'CFO': 'development',
    //   'BBO': 'development',
    // },
    master: {
      CFO: "master",
      BBO: "master"
    },
    "uat-dev": {
      CFO: "release/uat",
      BBO: "release/uat"
    },
    ftt: {
      CFO: "feature/ftt",
      BBO: "feature/ftt"
    },
    softToken: {
      CFO: "feature/softToken",
      BBO: "feature/softToken"
    },
    cheque: {
      CFO: "feature/cheque",
      BBO: "feature/cheque"
    },
    duitnow: {
      CFO: "feature/duitnow",
      BBO: "feature/duitnow"
    },
    "fraud-detection": {
      CFO: "feature/fraud-detection",
      BBO: "feature/fraud-detection"
    },
    quickfix: {
      CFO: "hotfix/quickfix",
      BBO: "hotfix/mvp2.3.3"
    },
    uat2: {
      CFO: "hotfix/mvp2.3",
      BBO: "hotfix/mvp2.3"
    },
    "uat-master": {
      CFO: "hotfix/mvp2.3",
      BBO: "hotfix/mvp2.3"
    },
    // MVP2.4.0 <BugFix>
    "mvp2.4.0": {
      CFO: "release/mvp2.4.0",
      BBO: "release/mvp2.4.0"
    },
    // MVP2.4.0.2 <BugFix>
    "mvp2.4.0.2": {
      // 'CFO': 'hotfix/mvp2.4.0.2',
      BBO: "hotfix/mvp2.4.0.2"
    }
  },
  NewOutputMapping = {
    softToken: "",
    "fraud-detection": "",
    duitnow: "",
    cheque: "",
    "mvp2.4.0": "",
    ftt: "",
    "uat-dev": "",
    master: ""
    // 'mvp2.4.0.1': '',
  },
  NewOutputMappingBBO = {
    cheque: "",
    "uat-dev": "",
    master: "",
    "mvp2.4.0.2": ""
  };

// print version and usage description
program.version(require("./package.json").version, "-v, --version");

// program
//   .option("-s, --skipbuild", "Skip build process")
//   .option("-b, --build [value]", "Build target, default is uat2")
//   .description("Deploy an AmAccess Project")
//   .action(async (projectname, { skipbuild, build = "uat2" }) => {
//     let projectOutputRepoOptions = {
//       get CFO() {
//         // custom handle on new output repo
//         if (build in NewOutputMapping)
//           return generatePath("amaccess-web-output");
//         return generatePath("mvp2-cfo");
//       },
//       // 'BBO': generatePath('amaccess-bbo-output'),
//       get BBO() {
//         if (build in NewOutputMappingBBO)
//           return generatePath("amaccess-bbo-output2");
//         return generatePath("amaccess-bbo-output");
//       }
//     };

//     try {
//       log("Check running process");
//       let result = await psLookup({
//         command: "node",
//         arguments: projectname
//       });

//       if (result.length > 1) {
//         throw new Error("Existing node process is running");
//       }

//       let project = projectname.toUpperCase();

//       if (Object.keys(projectPathDeployOptions).indexOf(project) >= 0) {
//         log(`Start deploying ${projectname} ${build}`);
//         let projectPath = projectPathDeployOptions[project],
//           outputPath = projectOutputRepoOptions[project];
//         log(
//           `Looking ${project} folder (${projectPath}) and start fetching latest source (${projectBranch[build][project]})`
//         );

//         // fetch latest source and some info
//         let sourceRepo = git(projectPath);
//         await sourceRepo.addConfig("user.name", `AmAccess's iMac`);
//         await sourceRepo.addConfig("user.email", `ambank_amaccess`);
//         await sourceRepo.checkout(projectBranch[build][project]);
//         await sourceRepo.pull();

//         log(`Done pull for ${project} folder (${projectPath})`);

//         // if (build === 'dev' && projectBranch['uat'][project] !== projectBranch[build][project]) {
//         //   log(`Merging ${projectBranch['uat'][project]} into ${projectBranch[build][project]}`)
//         //   await sourceRepo.checkout(projectBranch['uat'][project])
//         //   await sourceRepo.pull()
//         //   await sourceRepo.checkout(projectBranch[build][project])
//         //   await sourceRepo.mergeFromTo(projectBranch['uat'][project], projectBranch[build][project])
//         //   await sourceRepo.status()
//         //   await sourceRepo.push()
//         // }

//         let outputRepo = git(outputPath);
//         await outputRepo.checkout(projectOutputRepoBranch[build][project]);
//         await outputRepo.pull();
//         log(`Done pull for output folder (${outputPath})`);

//         let { branch, abbreviatedSha, committer, commitMessage } = getRepoInfo(
//           projectPath
//         );

//         // start building
//         if (!skipbuild) {
//           log("Pulling done, start building project");

//           exca.sync("npm", ["run", "build:ci"], {
//             cwd: projectPath
//           });

//           // start deploy
//           log("Build done, start deploying");
//         }
//         // delete all assets at output repo
//         await del.promise([`${outputPath}/*`]);

//         // move all build assets to output repo
//         await fs.copy(`${projectPath}/build`, `${outputPath}`);
//         let { insertions, deletions } = await outputRepo.diffSummary();

//         await outputRepo.addConfig("user.name", `AmAccess's iMac`);
//         await outputRepo.addConfig("user.email", `ambank_amaccess`);
//         if (insertions + deletions !== 0) {
//           await outputRepo.add(".");
//           await outputRepo.commit(
//             `deploy '${commitMessage}' (${abbreviatedSha}) by ${committer} on '${new Date().toString()}'`
//           );
//           await outputRepo.push();
//           log("Deploy done");
//         } else {
//           throw new Error(`No changes detected, will terminate`);
//         }
//       } else {
//         throw new Error(
//           `${projectname} not found, available options: ${Object.keys(
//             projectPathDeployOptions
//           ).join(", ")}`
//         );
//       }
//     } catch (e) {
//       error(`${e}, please contact ${author} if needed`);
//       error(e.stack);
//     }
//   });

program.parse(process.argv);
