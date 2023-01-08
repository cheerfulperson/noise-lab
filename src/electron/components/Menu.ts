import { Menu, dialog } from "electron";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export function showMenu(): void {
  const menu = Menu.buildFromTemplate([
    {
      label: "Изменить теорию",
      async click(_, browserWindow) {
        try {
          const box = await dialog.showMessageBox(browserWindow, {
            message:
              "Вы уверены, что хотите продолжить? Только администратор может изменяять данные файлы.",
            type: "question",
            buttons: ["Нет", "Да"],
          });
          if (box.response === 1) {
            const event = await dialog.showOpenDialog(browserWindow, {
              properties: ["openFile"],
              filters: [{ name: "*", extensions: ["pdf"] }],
            });

            if (!event.canceled) {
              const data = await readFile(join(...event.filePaths));
              // Dev mode "./public/assets/files/info.pdf"
              await writeFile(
                join("resources/app/.webpack/renderer/info.pdf"),
                data
              );
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            return dialog.showErrorBox("Some error", error.message);
          }
          dialog.showErrorBox("Some error", error);
        }
      },
    },
    {
      label: "Изменить ход работы",
      async click(_, browserWindow) {
        try {
          const box = await dialog.showMessageBox(browserWindow, {
            message:
              "Вы уверены, что хотите продолжить? Только администратор может изменяять данные файлы.",
            type: "question",
            buttons: ["Нет", "Да"],
          });
          if (box.response === 1) {
            const event = await dialog.showOpenDialog(browserWindow, {
              properties: ["openFile"],
              filters: [{ name: "*", extensions: ["pdf"] }],
            });

            if (!event.canceled) {
              const data = await readFile(join(...event.filePaths));
              // Dev mode "./public/assets/files/trip.pdf"
              await writeFile(
                join("resources/app/.webpack/renderer/trip.pdf"),
                data
              );
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            return dialog.showErrorBox("Some error", error.message);
          }
          dialog.showErrorBox("Some error", "Hmmm");
        }
      },
    },
  ]);
  Menu.setApplicationMenu(menu);
}
