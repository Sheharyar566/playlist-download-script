const ytpl = require('ytpl');
const fs = require('fs');

(async () => {
  const playlist = await ytpl('PL6Rtnh6YJK7ZXcYbRigP6i0GwelstH6jc', {
    limit: 1000,
  });
  // fs.writeFileSync('./output.txt', playlist.items.map(item => item.url).join('\n'));

  const items = playlist.items.filter(item => {
    const splitName = item.title.split('-')[1].split(' ');

    for (let i = 0; i < splitName.length; i++) {
      const name = splitName[i];
      const parsedName = parseInt(name);

      if (!isNaN(parsedName)) {
        return parsedName > 527;
      }
    }
  }).map((item) => {
    const splitName = item.title.split('-')[1].split(' ');
    let episode;

    for (let i = 0; i < splitName.length; i++) {
      const name = splitName[i];
      const parsedName = parseInt(name);

      if (!isNaN(parsedName)) {
        episode = parsedName;
      }
    }

    return {
      episode,
      url: item.url,
      shortUrl: item.shortUrl,
    };
  });

  fs.writeFileSync('./output.json', JSON.stringify(items.reverse()));
})();