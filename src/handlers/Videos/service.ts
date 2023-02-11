import Categories from 'src/models/VideosCategoriesModel';
import Videos, { IVideos } from 'src/models/VideosModel';

export default class VideoService {
  static createVideo = async (video: IVideos): Promise<IVideos | null | void> => {
    const category = await Categories.findById({ _id: video.category_id });
    if (category) {
      return await Videos.create(video)
        .then(async (result: IVideos) => {
          await Categories.findByIdAndUpdate(
            { _id: video.category_id },
            {
              $push: { videos: result._id },
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

  static getVideo = async (category_id: string, page: number): Promise<IVideos[] | null> => {
    const limit = 50;
    let skip = 0;

    if (page > 1) {
      skip = limit * (page - 1);
    }
    return await Videos.find({ category_id })
      .skip(skip)
      .limit(limit)
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static getAllVideobyCategory = async (): Promise<any | null> => {
    return await Categories.find()
      .lean()
      .populate([
        {
          path: 'videos',
          model: 'Videos',
        },
      ])
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };
  static getAllVideo = async (): Promise<any | null> => {
    return await Videos.find()
      .lean()
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static getAllVideobyCategoryId = async (category_id: string): Promise<any | null> => {
    return await Categories.find({ _id: category_id })
      .lean()
      .populate([
        {
          path: 'videos',
          model: 'Videos',
          match: { is_public: true },
        },
      ])
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static getVideobyCategoryId = async (category_id: string, _id: string): Promise<IVideos | null> => {
    return await Videos.findOne({ _id, category_id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };
  static getVideobyId = async (_id: string): Promise<IVideos | null> => {
    return await Videos.findOne({ _id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };

  static getVideosbyId = async (_id: string): Promise<IVideos[] | null> => {
    return await Videos.find({ _id })
      .lean()
      .populate([
        {
          path: 'seasons',
          model: 'Seasons',
          match: { is_public: true },
        },
      ])
      .catch((err) => {
        console.log('error ===>', err);
        return null;
      });
  };

  static updateVideobyId = async (_id: string, video: any): Promise<IVideos | null> => {
    return await Videos.findByIdAndUpdate(
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

  static deleteVideobyId = async (_id: string): Promise<IVideos | null> => {
    const deleted = await Videos.findByIdAndDelete({ _id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
    await Categories.findByIdAndUpdate({ $pull: { videos: _id } });
    return deleted;
  };
}
