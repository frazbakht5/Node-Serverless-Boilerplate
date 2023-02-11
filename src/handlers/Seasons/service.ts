import Seasons, { ISeasons } from 'src/models/SeasonsModel';
import Videos from 'src/models/VideosModel';
import Episodes from 'src/models/EpisodesModel';

export default class SeasonsService {
  static createSeason = async (video: ISeasons): Promise<ISeasons | null | void> => {
    const category = await Videos.findById({ _id: video.video_id });
    if (category) {
      return await Seasons.create(video)
        .then(async (result: ISeasons) => {
          await Videos.findByIdAndUpdate(
            { _id: video.video_id },
            {
              $push: { seasons: result._id },
            },
          );
          return result;
        })
        .catch((err) => {
          console.log('error ===>', err);
          return null;
        });
    } else {
      return null;
    }
  };

  static getSeason = async (video_id: string, page: number): Promise<ISeasons[] | null> => {
    const limit = 50;
    let skip = 0;

    if (page > 1) {
      skip = limit * (page - 1);
    }
    return await Seasons.find({ video_id })
      .skip(skip)
      .limit(limit)
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static getAllSeasonbyVideo = async (video_id: string): Promise<any | null> => {
    return await Videos.find({ _id: video_id })
      .lean()
      .populate([
        {
          path: 'categories',
          model: 'Seasons',
          match: { is_public: true },
        },
      ])
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };
  static getAllSeason = async (): Promise<any | null> => {
    return await Seasons.find()
      .lean()
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static getSeasonbyVideoId = async (video_id: string, _id: string): Promise<ISeasons | null> => {
    return await Seasons.findOne({ _id, video_id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };

  static getSeasonsbyId = async (_id: string): Promise<ISeasons[] | null> => {
    return await Videos.find({ _id })
      .lean()
      .populate([{ path: 'seasons', model: Seasons, populate: [{ path: 'episodes', model: Episodes }] }])
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };
  static getSeasonsbyVideoId = async (_id: string): Promise<ISeasons[] | null> => {
    return await Seasons.find({ video_id: _id })
      .lean()
      .populate([{ path: 'episodes', model: Episodes }])
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static updateSeasonbyId = async (_id: string, video: any): Promise<ISeasons | null> => {
    return await Seasons.findByIdAndUpdate(
      { _id },
      { $set: video },
      {
        returnOriginal: false,
      },
    ).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };

  static deleteSeasonbyId = async (_id: string): Promise<ISeasons | null> => {
    const deleted = await Seasons.findByIdAndDelete({ _id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
    await Videos.findByIdAndUpdate({ $pull: { seasons: _id } });
    return deleted;
  };
}
