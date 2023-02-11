import Watchlater, { IWatchlater } from 'src/models/WatchlaterModel';

export default class WatchlaterService {
  static createWatchlater = async (video: IWatchlater): Promise<IWatchlater | null | void> => {
    return await Watchlater.create(video).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };

  static getWatchlater = async (user_id: string, page: number): Promise<IWatchlater[] | null> => {
    const limit = 50;
    let skip = 0;

    if (page > 1) {
      skip = limit * (page - 1);
    }
    return await Watchlater.find({ user_id })
      .skip(skip)
      .limit(limit)
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static deleteWatchlaterbyId = async (_id: string): Promise<IWatchlater | null> => {
    return await Watchlater.findByIdAndDelete({ _id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };
}
