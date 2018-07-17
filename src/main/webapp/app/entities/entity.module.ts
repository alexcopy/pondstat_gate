import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GateLocationMySuffixModule as PondLocationMySuffixModule } from './pond/location-my-suffix/location-my-suffix.module';
import { GateTankMySuffixModule as PondTankMySuffixModule } from './pond/tank-my-suffix/tank-my-suffix.module';
import { GateDeviceMySuffixModule as PondDeviceMySuffixModule } from './pond/device-my-suffix/device-my-suffix.module';
import { GateTempMeterMySuffixModule as PondTempMeterMySuffixModule } from './pond/temp-meter-my-suffix/temp-meter-my-suffix.module';
import { GateMeterReadingMySuffixModule as PondMeterReadingMySuffixModule } from './pond/meter-reading-my-suffix/meter-reading-my-suffix.module';
import { GateFilterPumpCleaningMySuffixModule as PondFilterPumpCleaningMySuffixModule } from './pond/filter-pump-cleaning-my-suffix/filter-pump-cleaning-my-suffix.module';
import { GateWaterChangeMySuffixModule as PondWaterChangeMySuffixModule } from './pond/water-change-my-suffix/water-change-my-suffix.module';
import { GateLiveStockMySuffixModule as PondLiveStockMySuffixModule } from './pond/live-stock-my-suffix/live-stock-my-suffix.module';
import { GateChemicalAnalysisMySuffixModule as PondChemicalAnalysisMySuffixModule } from './pond/chemical-analysis-my-suffix/chemical-analysis-my-suffix.module';
import { GateChemicalsMySuffixModule as PondChemicalsMySuffixModule } from './pond/chemicals-my-suffix/chemicals-my-suffix.module';
import { GateOtherWorksMySuffixModule as PondOtherWorksMySuffixModule } from './pond/other-works-my-suffix/other-works-my-suffix.module';
import { GateVkUserMySuffixModule as VkbotVkUserMySuffixModule } from './vkbot/vk-user-my-suffix/vk-user-my-suffix.module';
import { GateVkPictureMySuffixModule as VkbotVkPictureMySuffixModule } from './vkbot/vk-picture-my-suffix/vk-picture-my-suffix.module';
import { GateVkGroupMySuffixModule as VkbotVkGroupMySuffixModule } from './vkbot/vk-group-my-suffix/vk-group-my-suffix.module';
import { GateTrainedModelMySuffixModule as VkbotTrainedModelMySuffixModule } from './vkbot/trained-model-my-suffix/trained-model-my-suffix.module';
import { GateClarifaiProcessMySuffixModule as VkbotClarifaiProcessMySuffixModule } from './vkbot/clarifai-process-my-suffix/clarifai-process-my-suffix.module';
import { GateModelTrainingMySuffixModule as VkbotModelTrainingMySuffixModule } from './vkbot/model-training-my-suffix/model-training-my-suffix.module';
import { GatePictureRecognitionMySuffixModule as VkbotPictureRecognitionMySuffixModule } from './vkbot/picture-recognition-my-suffix/picture-recognition-my-suffix.module';
import { GateResultsMatricesMySuffixModule as VkbotResultsMatricesMySuffixModule } from './vkbot/results-matrices-my-suffix/results-matrices-my-suffix.module';
import { GateSuggestIgnoredMySuffixModule as VkbotSuggestIgnoredMySuffixModule } from './vkbot/suggest-ignored-my-suffix/suggest-ignored-my-suffix.module';
import { GateSelectedKeyWordsMySuffixModule as VkbotSelectedKeyWordsMySuffixModule } from './vkbot/selected-key-words-my-suffix/selected-key-words-my-suffix.module';
import { GateClarifaisMySuffixModule as VkbotClarifaisMySuffixModule } from './vkbot/clarifais-my-suffix/clarifais-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PondLocationMySuffixModule,
        PondTankMySuffixModule,
        PondDeviceMySuffixModule,
        PondTempMeterMySuffixModule,
        PondMeterReadingMySuffixModule,
        PondFilterPumpCleaningMySuffixModule,
        PondWaterChangeMySuffixModule,
        PondLiveStockMySuffixModule,
        PondChemicalAnalysisMySuffixModule,
        PondChemicalsMySuffixModule,
        PondOtherWorksMySuffixModule,
        VkbotVkUserMySuffixModule,
        VkbotVkPictureMySuffixModule,
        VkbotVkGroupMySuffixModule,
        VkbotTrainedModelMySuffixModule,
        VkbotClarifaiProcessMySuffixModule,
        VkbotModelTrainingMySuffixModule,
        VkbotPictureRecognitionMySuffixModule,
        VkbotResultsMatricesMySuffixModule,
        VkbotSuggestIgnoredMySuffixModule,
        VkbotSelectedKeyWordsMySuffixModule,
        VkbotClarifaisMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateEntityModule {}
