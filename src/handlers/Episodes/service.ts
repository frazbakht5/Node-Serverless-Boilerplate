import Episodes, { IEpisodes } from 'src/models/EpisodesModel';
import Seasons from 'src/models/SeasonsModel';

export default class EpisodesService {
  static createEpisode = async (video: IEpisodes): Promise<IEpisodes | null | void> => {
    const category = await Seasons.findById({ _id: video.season_id });
    if (category) {
      return await Episodes.create(video)
        .then(async (result: IEpisodes) => {
          await Seasons.findByIdAndUpdate(
            { _id: video.season_id },
            {
              $push: { episodes: result._id },
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

  static getEpisode = async (season_id: string, page: number): Promise<IEpisodes[] | null> => {
    const limit = 50;
    let skip = 0;

    if (page > 1) {
      skip = limit * (page - 1);
    }
    return await Episodes.find({ season_id })
      .skip(skip)
      .limit(limit)
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static getAllEpisodebySeason = async (season_id: string): Promise<any | null> => {
    return await Seasons.find({ _id: season_id })
      .lean()
      .populate([
        {
          path: 'categories',
          model: 'Episodes',
          match: { is_public: true },
        },
      ])
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static getEpisodebySeasonId = async (season_id: string, _id: string): Promise<IEpisodes | null> => {
    return await Episodes.findOne({ _id, season_id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };

  static getEpisodesbyId = async (_id: string): Promise<IEpisodes[] | null> => {
    return await Seasons.find({ _id })
      .lean()
      .populate([
        {
          path: 'episodes',
          model: Episodes,
        },
      ])
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static updateEpisodebyId = async (_id: string, video: any): Promise<IEpisodes | null> => {
    return await Episodes.findByIdAndUpdate(
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

  static deleteEpisodebyId = async (_id: string): Promise<IEpisodes | null> => {
    const deleted = await Episodes.findByIdAndDelete({ _id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
    await Seasons.findByIdAndUpdate({ $pull: { episodes: _id } });
    return deleted;
  };
}
