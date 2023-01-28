import axios from 'axios';

const execute = async function (data) {
  try {
    const response = await axios({
      url: 'http://localhost:3010/',
      method: 'post',
      data,
    });

    const result = await response.data;
    console.log(JSON.stringify(result, undefined, ' '));
  } catch (error) {
    console.log(error);
  }
};

const getChannels = {
  query: `query { 
    canais: channels {
      name 
      playlists { 
        description 
        videos { 
          title 
          }
        } 
      } 
    }`,
};

const setChannels = {
  query: `mutation {
    saveChannel(name: "Rocketseat"){
      name
    }
  }`,
};

const onlyChannel = {
  query: `query { 
    canais: channels(idChannel: 1) {
      name 
      playlists { 
        description 
        videos { 
          title 
          }
        } 
      } 
    }`,
};

(async function () {
  await execute(getChannels);
  console.log('--');
  await execute(setChannels);
  console.log('--');
  await execute(onlyChannel);
})();
