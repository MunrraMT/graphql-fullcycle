import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Channel {
    idChannel: Int
    name: String
    playlists: [Playlist]
  }

  type Playlist {
    idPlaylist: Int
    idChannel: Int
    description: String
    videos: [Video]
  }

  type Video {
    idVideo: Int
    title: String
  }

  type Query {
    channels(idChannel: Int): [Channel]
  }

  type Mutation {
    saveChannel(name: String): Channel
  }
`;

const channels = [
  { idChannel: 1, name: 'Maria' },
  { idChannel: 2, name: 'Camila' },
  { idChannel: 3, name: 'André' },
];

const playlists = [
  { idPlaylist: 1, idChannel: 1, description: 'Javascript' },
  { idPlaylist: 2, idChannel: 2, description: 'Typescript' },
  { idPlaylist: 3, idChannel: 1, description: 'NodeJS' },
];

const videos = [
  { idVideo: 1, idPlaylist: 1, title: 'Intro JS' },
  { idVideo: 2, idPlaylist: 1, title: 'Intro TS' },
  { idVideo: 3, idPlaylist: 3, title: 'TDD' },
];

const resolvers = {
  Query: {
    channels(obj, args) {
      const { idChannel } = args;
      if (!idChannel) return channels;
      return channels.filter((channel) => channel.idChannel === idChannel);
    },
  },
  Mutation: {
    saveChannel(obj, args) {
      const { name } = args;
      const channel = { name };
      channels.push(channel);
      return channel;
    },
  },
  Channel: {
    playlists(obj, args) {
      const { idChannel } = obj;
      return playlists.filter((playlist) => playlist.idChannel === idChannel);
    },
  },
  Playlist: {
    videos(obj, args) {
      const { idPlaylist } = obj;
      return videos.filter((video) => video.idPlaylist === idPlaylist);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 3010 },
});

console.log(`Server ON: ${url}`);
