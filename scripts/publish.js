const { execSync } = require("child_process");
const inquirer = require("inquirer");
const signale = require("signale");
const fs = require("fs");

inquirer
  .prompt({
    type: "input",
    message: "commit",
    name: "commit",
    default: "版本更新" // 默认值
  })
  .then(answer => {
    signale.pending("准备构建");
    execSync("npm run build", { stdio: "inherit" });
    const package = JSON.parse(fs.readFileSync("./package.json"));
    const version = package.version.split(".");
    version[2] = parseInt(version[2]) + 1;
    package.version = version.join(".");
    fs.writeFileSync("./package.json", JSON.stringify(package, null, 2), {
      encoding: "utf8"
    });
    signale.warn("clean tgz");
    execSync("rimraf ./*tgz", { stdio: "inherit" });
    signale.pending("发布");
    execSync("npm pack", { stdio: "inherit" });
    execSync("npm publish", { stdio: "inherit" });
    signale.pending("提交到版本库");
    execSync("git add -A", { stdio: "inherit" });
    execSync(`git commit -m"${answer.commit}"`, { stdio: "inherit" });
    execSync("git push", { stdio: "inherit" });
    signale.success("finish");
  });
