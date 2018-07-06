const { ApolloServer, gql } = require('apollo-server');

const tracks = [
    {
        title: "track1",
        artist: "artist1",
        id: "0"
    },
    {
        title: "track2",
        artist: "artist2",
        id: "1"
    },
    {
        title: "track3",
        artist: "artist3",
        id: "3"
    }
];
const playlists = [];

const typeDefs = gql`

  type Track {
    title: String!
    artist: String!
    id: ID!
  }

  type Playlist {
      title: String!
      genre: String!
      tracks: [Track]
      id: ID!
  }

  type Query {
    tracks (id: ID!): [Track]
    playlists (id: ID!): [Playlist]
    allTracks: [Track]
  }

  type Mutation {
      addTrack(title:String!, artist:String!, id:ID!):Track
      addPlaylist(title:String!, genre:String!, id:ID!):Playlist
  }
`;

const resolvers = {
    Query: {
        tracks (obj, args, context) {
            return tracks.find(track => track.id === args.id);
        },
        playlists (obj, args, context) {
            return playlists.find(playlist => playlist.id === args.id);
        },
        allTracks: () => tracks
    },
    Mutation: {
        addTrack (obj, args, context) {
            const newTrack = {
                title: args.title,
                artist: args.artist,
                id: args.id
                };
            tracks.push(newTrack);
            return newTrack;
        },
        addPlaylist (obj, args, context) {
            const newPlaylist = {
                title: args.title,
                genre: args.genre,
                id: args.id,
                tracks: args.tracks
            };
            playlists.push(newPlaylist);
            return newPlaylist;
            }
        }
    };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});