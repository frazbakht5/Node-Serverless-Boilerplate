import PauseResume, { IPauseResume } from 'src/models/Pauseresume';

export default class PauseResumeService {
  static createPauseResume = async (video: IPauseResume): Promise<IPauseResume | null | void> => {
    return await PauseResume.updateOne({ user_id: video.user_id, video_id: video.video_id }, video, {
      upsert: true,
    }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };

  static getPauseResume = async (user_id: string, video_id: string): Promise<IPauseResume | null> => {
    return await PauseResume.findOne({ user_id, video_id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };

  static deletePauseResumebyId = async (_id: string): Promise<IPauseResume | null> => {
    return await PauseResume.findByIdAndDelete({ _id }).catch((err) => {
      console.log('error ===>', err);
      return null;
    });
  };
}
