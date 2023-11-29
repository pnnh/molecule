package pipeline

import (
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"time"

	"galaxy-agent/models"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func Run(gctx *gin.Context) {
	pipelineInfo := &models.PipelineModel{}
	if err := gctx.ShouldBindJSON(pipelineInfo); err != nil {
		gctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	envList := os.Environ()
	for key, val := range pipelineInfo.Parameters {
		envList = append(envList, fmt.Sprintf("%s=%s", key, val))
	}
	workDir, err := os.MkdirTemp(os.TempDir(), "pipeline-*")
	if err != nil {
		gctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	logrus.Debugln("workDir:", workDir)

	runOutput, err := runTasks(pipelineInfo, envList, workDir)
	if err != nil {
		runOutput = fmt.Sprintf("执行失败: %v", err)
	}

	gctx.JSON(http.StatusOK, gin.H{"output": runOutput})
}

func runTasks(pipelineInfo *models.PipelineModel,
	envList []string, workDir string) (output string, err error) {
	defer func() {
		if ex := recover(); ex != nil {
			output = fmt.Sprintf("执行失败: %v", ex)
		}
	}()
	builder := &strings.Builder{}
	for _, stage := range pipelineInfo.Stages {
		for _, job := range stage.Jobs {
			for _, task := range job.Tasks {
				cmd := &exec.Cmd{
					Path:      "/bin/bash",
					Env:       envList,
					Dir:       workDir,
					Stdin:     strings.NewReader(task.Script),
					WaitDelay: time.Second * 60,
				}

				outputData, err := cmd.Output()
				if err != nil {
					if exitError, ok := err.(*exec.ExitError); ok {
						builder.WriteString(string(exitError.Stderr))
						goto RESULT
					}
					builder.WriteString(string(err.Error()))
					goto RESULT
				}
				exitCode := cmd.ProcessState.ExitCode()
				builder.WriteString(fmt.Sprintf("%d -> 执行TASK: [%d] %s\n%s\n",
					exitCode, task.Id, task.Name, task.Script))
				outputString := string(outputData) + "\n"
				builder.WriteString(outputString)
			}
		}
	}
RESULT:
	return builder.String(), err
}

func createTempScript(taskId int64, workDir, script string) (filePath string, err error) {

	//tempPath := fmt.Sprintf("%s/task-%d.sh", workDir, taskId)
	//tempFile, err := os.Create(tempPath)
	//if err != nil {
	//	return "", err
	//}
	//defer func() {
	//	err = tempFile.Close()
	//}()
	//if !strings.HasPrefix(script, "#!") {
	//	script = fmt.Sprintf("#!/bin/bash\n%s", script)
	//}
	//if _, err := tempFile.WriteString(script); err != nil {
	//	return "", err
	//}
	//return tempPath, nil
	return "", err
}
