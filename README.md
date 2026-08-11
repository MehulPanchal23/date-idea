# 💕 Date Invite Website

A playful, responsive static website inspired by the four screenshots and the
[hallowshaw/Will-you-go-out-with-me](https://github.com/hallowshaw/Will-you-go-out-with-me)
project.

## Pages

1. **The question** — "Will you go on a date with me?"
2. **Date details** — choose date, time and plan.
3. **Food** — choose Italian, Sushi, Pizza, Tacos, Burgers, Ramen, Brunch, Dessert First or You Pick.
4. **Confirmation** — animated hearts/confetti and a final date card.

## Run locally

Just open `index.html` in a browser. No Node.js, npm or build step is required.

## Publish on GitHub Pages

1. Create a new **public** GitHub repository, for example `date-invite`.
2. Upload `index.html`, `style.css` and `script.js`.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then **Save**.
6. After GitHub publishes it, the site will be available at:

`https://YOUR-USERNAME.github.io/date-invite/`

### Optional Git commands

```bash
git init
git add .
git commit -m "Create date invite website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/date-invite.git
git push -u origin main
```

## Customize

The easiest customization is in `index.html`:

- Change the question text.
- Change the default date/time.
- Change the available time options in the TIME dropdown.
- Change the available plans in the THE PLAN dropdown.
- Change the food choices.
- Change the final pickup message.

The colors and visual design are in `style.css`.
The page transitions and confetti are in `script.js`.
