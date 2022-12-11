import { Menu, dialog } from "electron";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export function showMenu(): void {
  const menu = Menu.buildFromTemplate([
    {
      label: "Изменить теорию",
      async click(_, browserWindow) {
        try {
          const event = await dialog.showOpenDialog(browserWindow, {
            properties: ["openFile"],
            filters: [{ name: "*", extensions: ["pdf"] }],
          });

          if (!event.canceled) {
            const data = await readFile(join(...event.filePaths));
            await writeFile(join("./public/assets/files/info.pdf"), data);
          }
        } catch (error) {
          if (error instanceof Error) {
            return dialog.showErrorBox("Some error", error.message);
          }
          dialog.showErrorBox("Some error", 'Hmmm');
        }
      },
    },
    {
      label: "Изменить ход работы",
      async click(_, browserWindow) {
        try {
          const event = await dialog.showOpenDialog(browserWindow, {
            properties: ["openFile"],
            filters: [{ name: "*", extensions: ["pdf"] }],
          });

          if (!event.canceled) {
            const data = await readFile(join(...event.filePaths));
            await writeFile(join("./public/assets/files/trip.pdf"), data);
          }
        } catch (error) {
          if (error instanceof Error) {
            return dialog.showErrorBox("Some error", error.message);
          }
          dialog.showErrorBox("Some error", 'Hmmm');
        }
      },
    },
  ]);
  Menu.setApplicationMenu(menu);
}
