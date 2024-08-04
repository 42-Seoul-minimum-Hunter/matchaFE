import { IChatRoomDto } from "@/components/chat/ChatList";
import { IChatContentDto } from "@/components/chat/ChatRoom";
import { ISearchDateDto } from "@/pages/SearchPage";
import { ProfileDto } from "@/types/tag.dto";
import TestImage1 from "@/assets/mock/test1.png";
import TestImage2 from "@/assets/mock/test2.png";
import TestImage3 from "@/assets/mock/test3.png";
import TestImage4 from "@/assets/mock/test4.png";
import TestImage5 from "@/assets/mock/test5.png";

export const LocationData = [
  {
    name: "서울",
    subArea: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
  },
  {
    name: "경기",
    subArea: [
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
      "가평군",
      "양평군",
      "여주군",
      "연천군",
    ],
  },
  {
    name: "인천",
    subArea: [
      "계양구",
      "미추홀구",
      "남동구",
      "동구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
    ],
  },
  {
    name: "대전광역시",
    subArea: ["대덕구", "동구", "서구", "유성구", "중구"],
  },
  {
    name: "대구광역시",
    subArea: [
      "남구",
      "달서구",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
      "달성군",
    ],
  },
  {
    name: "부산광역시",
    subArea: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ],
  },
  {
    name: "울산광역시",
    subArea: ["남구", "동구", "북구", "중구", "울주군"],
  },
  {
    name: "광주광역시",
    subArea: ["광산구", "남구", "동구", "북구", "서구"],
  },
  {
    name: "강원도",
    subArea: [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
  },
  {
    name: "충청북도",
    subArea: [
      "제천시",
      "청주시",
      "충주시",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "증평군",
      "진천군",
      "청원군",
    ],
  },

  {
    name: "충청남도",
    subArea: [
      "계룡시",
      "공주시",
      "논산시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "당진군",
      "부여군",
      "서천군",
      "연기군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",
    ],
  },

  {
    name: "경상북도",
    subArea: [
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시",
      "고령군",
      "군위군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ],
  },
  {
    name: "경상남도",
    subArea: [
      "거제시",
      "김해시",
      "마산시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "진해시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
  },
  {
    name: "전라북도",
    subArea: [
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ],
  },
  {
    name: "전라남도",
    subArea: [
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
  },
  {
    name: "제주도",
    subArea: ["서귀포시", "제주시"],
  },
];

export function generateDummyData(count: number): ISearchDateDto[] {
  const firstNames = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "Ethan",
    "Sophia",
    "Mason",
    "Isabella",
    "William",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Taylor",
    "Miller",
    "Wilson",
    "Moore",
    "Anderson",
    "Jackson",
    "Martin",
  ];

  function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFloat(min: number, max: number, decimals: number): number {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }

  return Array.from({ length: count }, (_, index) => ({
    profileImages: `https://example.com/avatar${index + 1}.jpg`,
    username: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
    age: getRandomNumber(18, 60),
    rate: getRandomFloat(1, 5, 1),
    commonHashtags: getRandomNumber(0, 10),
  }));
}

export const mockIChatProps: IChatRoomDto[] = [
  {
    username: "Alice Smith",
    profileImage: "https://example.com/profiles/alice.jpg",
    createdAt: "2023-07-15T10:30:00Z",
    lastContent: "안녕하세요! 오늘 날씨가 정말 좋네요.",
  },
  {
    username: "Bob Johnson",
    profileImage: "https://example.com/profiles/bob.jpg",
    createdAt: "2023-07-15T10:35:00Z",
    lastContent: "네, 정말 그렇네요. 나들이 가기 좋은 날씨예요.",
  },
  {
    username: "Test 1",
    profileImage: "https://example.com/profiles/bob.jpg",
    createdAt: "2023-07-15T10:35:00Z",
    lastContent: "집 가고 싶네요",
  },
];

// ChatContentDto 목데이터
export const mockChatContentDto: IChatContentDto[] = [
  {
    message: "오늘 저녁에 뭐 먹을까요?",
    username: "Alice Smith",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "피자 어떠세요?",
    username: "Bob Johnson",
    // userId: 1002,
    time: "2023-07-15T18:05:00Z",
  },
  {
    message: "아님 치킨이라도?",
    username: "Bob Johnson",
    // userId: 1002,
    time: "2023-07-15T18:05:00Z",
  },
  {
    message: "둘다 싫은데요..//",
    username: "Alice Smith",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Alice Smith",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "그럼 밥먹지 마",
    username: "Bob Johnson",
    // userId: 1002,
    time: "2023-07-15T18:05:00Z",
  },
  {
    message: "아니 왜 화면 너무 길잖아",
    username: "Bob Johnson",
    // userId: 1002,
    time: "2023-07-15T18:05:00Z",
  },
  {
    message: "언제까지 써야해",
    username: "Bob Johnson",
    // userId: 1002,
    time: "2023-07-15T18:05:00Z",
  },
  {
    message: "살려줘",
    username: "Bob Johnson",
    // userId: 1002,
    time: "2023-07-15T18:05:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Alice Smith",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Alice Smith",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Alice Smith",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Bob Johnson",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Bob Johnson",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Bob Johnson",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Bob Johnson",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Bob Johnson",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Bob Johnson",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Bob Johnson",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
  {
    message: "아 집가고 싶다",
    username: "Bob Johnson",
    // userId: 1001,
    time: "2023-07-15T18:00:00Z",
  },
];

export const mockProfileData: ProfileDto = {
  username: "johndoe123",
  firstName: "John",
  lastName: "Doe",
  gender: "MALE", // GenderType에 따라 적절한 값을 사용해야 합니다.
  preference: "BOTH", // PreferenceType에 따라 적절한 값을 사용해야 합니다.
  age: 28,
  biography:
    "Officiis quasi esse deleniti dignissimos qui. Voluptates eos tempora. Earum aperiam tempore totam sequi ab consequatur voluptatem dolorem aliquam. Maxime amet enim beatae aperiam eum placeat.",
  hashtags: ["MUSIC", "TRAVEL", "FOOD"], // InterestType 배열에 맞는 값들을 사용해야 합니다.
  si: "서울특별시",
  gu: "강남구",
  rate: 4.5,
  profileImages: [TestImage1, TestImage2, TestImage3],
  // profileImages: [
  //   "https://example.com/profile1.jpg",
  //   "https://example.com/profile2.jpg",
  //   "https://example.com/profile3.jpg",
  // ],
};
