package controllers

import (
	"encoding/json"

	"github.com/beego/beego/v2/client/httplib"
	beego "github.com/beego/beego/v2/server/web"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.Data["Page"] = "index"
	c.TplName = "index.tpl"
}

func (c *MainController) ShowVoting() {
	c.Data["Page"] = "voting"
	c.TplName = "index.tpl"
}

func (c *MainController) ShowBreeds() {
	c.Data["Page"] = "breeds"
	c.TplName = "index.tpl"
}

func (c *MainController) ShowFavorites() {
	c.Data["Page"] = "favorites"
	c.TplName = "index.tpl"
}

func (c *MainController) GetBreeds() {
	apiKey, _ := beego.AppConfig.String("catapi_key")
	req := httplib.Get("https://api.thecatapi.com/v1/breeds")
	req.Header("x-api-key", apiKey)

	var breeds interface{}
	err := req.ToJSON(&breeds)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"error": err.Error()}
	} else {
		c.Data["json"] = breeds
	}
	c.ServeJSON()
}

func (c *MainController) GetRandomImage() {
	apiKey, _ := beego.AppConfig.String("catapi_key")
	req := httplib.Get("https://api.thecatapi.com/v1/images/search")
	req.Header("x-api-key", apiKey)

	var images []map[string]interface{}
	err := req.ToJSON(&images)
	if err != nil || len(images) == 0 {
		c.Data["json"] = map[string]interface{}{"error": "Failed to get random image"}
	} else {
		c.Data["json"] = images[0]
	}
	c.ServeJSON()
}

func (c *MainController) AddFavorite() {
	var favorite struct {
		Url string `json:"url"`
	}
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &favorite); err != nil {
		c.Data["json"] = map[string]interface{}{"error": err.Error()}
		c.ServeJSON()
		return
	}

	c.Data["json"] = map[string]interface{}{"success": true}
	c.ServeJSON()
}

func (c *MainController) GetFavorites() {
	c.Data["json"] = []string{}
	c.ServeJSON()
}
