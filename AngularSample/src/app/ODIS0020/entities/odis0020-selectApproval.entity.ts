import { ODIS0020OrderDetaiSplitBean } from './odis0020-OrderDetailSplit.entity'
import { ODIS0020CustomerInfoBean } from './odis0020-OrderInformation.entity'

export class ODIS0020SelApproval {

	/** 事業所コード */
	jgyshCd: string;

    /** 選択承認者 */
	approval: string;

	/** 発注明細データ */
	orderDetailList: ODIS0020OrderDetaiSplitBean[];

}
