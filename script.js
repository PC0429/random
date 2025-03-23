let isFirstRun = true;

function generateGroups() {
    const namesInput = document.getElementById("names").value.trim();
    const groupCountInput = document.getElementById("groupCount").value;
    if (!namesInput) {
        alert("请输入名字！");
        return;
    }
    if (!groupCountInput || groupCountInput < 1) {
        alert("组数必须至少为 1！");
        return;
    }

    // 将输入的名字按行分割成数组
    const names = namesInput.split("\n").filter(name => name.trim() !== "");
    const groupCount = parseInt(groupCountInput);

    // 如果是第一次运行，按顺序分组
    let groups;
    if (isFirstRun) {
        groups = Array.from({ length: groupCount }, () => []);

        // 计算每组的基本大小和剩余的成员
        const baseSize = Math.floor(names.length / groupCount);
        const remainder = names.length % groupCount;

        let index = 0;
        for (let i = 0; i < groupCount; i++) {
            const groupSize = baseSize + (i < remainder ? 1 : 0); // 前 remainder 组多一个人
            for (let j = 0; j < groupSize; j++) {
                groups[i].push(names[index++]);
            }
        }

        isFirstRun = false;
    } else {
        // 随机打乱数组
        for (let i = names.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [names[i], names[j]] = [names[j], names[i]];
        }
        // 分组逻辑
        groups = Array.from({ length: groupCount }, () => []);
        for (let i = 0; i < names.length; i++) {
            const groupIndex = i % groupCount;
            groups[groupIndex].push(names[i]);
        }
    }

    // 显示结果
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<strong>分组结果：</strong><br>";
    groups.forEach((group, index) => {
        resultDiv.innerHTML += `
            <div class="group">
                组 ${index + 1}: ${group.join(", ")}
            </div>
        `;
    });
}

function resetPage() {
    document.getElementById("names").value = "";
    document.getElementById("groupCount").value = "1";
    document.getElementById("result").innerHTML = "";
    isFirstRun = true; // 重置时恢复第一次运行状态
}
