import { Schema, model, Model, Document } from 'mongoose';

interface ticketAttr {
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
  build: (attr: ticketAttr) => TicketDoc;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

ticketSchema.statics.build = (attr: ticketAttr) => {
  return new Ticket(attr);
};

const Ticket = model<TicketDoc, TicketModel>('ticket', ticketSchema);

export { Ticket };
