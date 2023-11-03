import { Schema, model, Model, Document } from 'mongoose';

interface TicketAttr {
  title: string;
  price: string;
  userId: string;
}

interface TicketDoc extends Document {
  title: string;
  price: string;
  userId: string;
  createdAt: Date;
}

interface TicketModel extends Model<TicketDoc> {
  build: (attr: TicketAttr) => TicketDoc;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // returns the data you want returned
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

ticketSchema.statics.build = (attr: TicketAttr) => {
  return new Ticket(attr);
};

const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
