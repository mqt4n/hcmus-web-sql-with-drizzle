import { Router } from 'express';
import { topicController } from '../controllers/topic.controller';

const router = Router();

router.get('/', topicController.getAllTopics.bind(topicController));
router.get('/:id', topicController.getTopicById.bind(topicController));
router.post('/', topicController.createTopic.bind(topicController));
router.put('/:id', topicController.updateTopic.bind(topicController));
router.delete('/:id', topicController.deleteTopic.bind(topicController));

export default router;
