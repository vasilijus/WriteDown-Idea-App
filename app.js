const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const moment = require('moment');


// Idea Servvice
class IdeaService {
    constructor() {
        this.ideas = [];
    }

    async find() {
        return this.ideas;
    }

    async create(data) {
        const idea = {
            id: this.ideas.length,
            text: this.data.text,
            tech: this.data.tech,
            viewer: data.viewer
        }
        idea.time = moment().format('hh:mm:ss a');

        this.ideas.push(idea);

        return idea;
    }
}


const app = express(feathers() );

// Parse JSON
app.use(express.json());
// Config Socket.io realtime APIs
app.configure(socketio());
// Enable REST services
app.configure(express.rest());
// Register Services
app.use('/ideas', new IdeaService());

// New connectionconnct to stram channel
app.on('connection', conn => app.channel('stream').join(conn) );
// Publish events to stream
app.publish(data => app.channel('stream'));

const PORT = process.env.PORT || 3030;

app.listen(PORT).on('listening', () => console.log(`Realtime server running on port ${PORT}`));