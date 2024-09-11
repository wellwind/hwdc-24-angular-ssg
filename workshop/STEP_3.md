# Angular Builders & Angular Schematics

專案內已將相關程式寫好，直接使用即可。

我們的目標是把一些手動但麻煩的工作自動化。

## Angular Schematics

1. 執行 `ng g @ssg-demo/schematics:generate-content-markdown --name="fourth-post"`

2. `在 public/content/fourth-post.md` 可以看到產出的 Markdown 內容

3. 隨意編輯裡面的內容，此時從瀏覽器看不到此篇文章，因為程式內會參考 `public/content/content-list.json` 的內容，而此檔案目前還沒有將這篇文章加入

4. 執行

   ```bash
   ng g @ssg-demo/schematics:generate-content-list \
     --content-dir=public/content \
     --content-list-path=public/content/content-list.json \
     --routes-path=routes.txt
   ```

   即可在 `public/content/content-list.json` 看到最新的文章列表，同時將此文章路徑加到 `routes.txt` 中

5. 重新啟動專案，即可在瀏覽器看到第四篇文章

> `@ssg-demo/schematics:generate-content-list` 和 `@ssg-demo/schematics:generate-content` 是自訂的 Angular Schematics，讓我們可以將產生檔案的邏輯與 `ng g` 指令整合

## Angular Builders

1. 執行 `npm run build` 產生整個靜態網站

2. 執行 `ng run hwdc-24-angular-ssg:preview-generated-site` 預覽產出的靜態網站

> `hwdc-24-angular-ssg:preview-generated-site` 是自訂的 Angular Builder，讓我們可以將寫好的程式與 `ng run` 指令整合
