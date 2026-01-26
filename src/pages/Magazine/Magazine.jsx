import React, { useState } from "react";
import { FaFire, FaNewspaper, FaMicrophone, FaMusic, FaPlayCircle } from "react-icons/fa";
import * as S from "./Magazine.style";

const Magazine = () => {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "전체", icon: <FaNewspaper /> },
    { id: "trending", label: "트렌딩", icon: <FaFire /> },
    { id: "interview", label: "인터뷰", icon: <FaMicrophone /> },
    { id: "new", label: "신곡", icon: <FaMusic /> },
  ];

  const articles = [
    {
      id: 1,
      category: "trending",
      title: "2024년을 뜨겁게 달군 K-POP의 진화",
      subtitle: "글로벌 차트를 장악한 한국 음악의 힘",
      image: "https://source.unsplash.com/random/800x600?kpop",
      author: "김음악",
      date: "2024.01.15",
      readTime: "5분",
      featured: true,
    },
    {
      id: 2,
      category: "interview",
      title: "NewJeans가 말하는 음악과 성장",
      subtitle: "데뷔 2년차, 그들의 진솔한 이야기",
      image: "https://source.unsplash.com/random/800x600?music",
      author: "박인터뷰",
      date: "2024.01.14",
      readTime: "8분",
    },
    {
      id: 3,
      category: "new",
      title: "이 주의 신곡: 들어야 할 5곡",
      subtitle: "차트를 흔들 새로운 음악들",
      image: "https://source.unsplash.com/random/800x600?album",
      author: "이추천",
      date: "2024.01.13",
      readTime: "4분",
    },
    {
      id: 4,
      category: "trending",
      title: "힙합의 부활, 2024 트렌드 분석",
      subtitle: "다시 돌아온 올드스쿨의 매력",
      image: "https://source.unsplash.com/random/800x600?hiphop",
      author: "최트렌드",
      date: "2024.01.12",
      readTime: "6분",
    },
    {
      id: 5,
      category: "interview",
      title: "프로듀서 250의 음악 철학",
      subtitle: "히트곡 뒤에 숨은 이야기",
      image: "https://source.unsplash.com/random/800x600?producer",
      author: "정인터뷰",
      date: "2024.01.11",
      readTime: "7분",
    },
    {
      id: 6,
      category: "new",
      title: "일렉트로닉의 새로운 물결",
      subtitle: "테크노와 하우스의 재발견",
      image: "https://source.unsplash.com/random/800x600?electronic",
      author: "강일렉",
      date: "2024.01.10",
      readTime: "5분",
    },
  ];

  const filteredArticles =
    activeTab === "all"
      ? articles
      : articles.filter((article) => article.category === activeTab);

  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <S.Container>
      {/* 헤더 */}
      <S.Header>
        <S.HeaderContent>
          <S.HeaderIcon>📰</S.HeaderIcon>
          <S.Title data-text="MAGAZINE">MAGAZINE</S.Title>
          <S.Subtitle>음악을 둘러싼 모든 이야기</S.Subtitle>
        </S.HeaderContent>
      </S.Header>

      {/* 카테고리 탭 */}
      <S.TabBar>
        {categories.map((cat) => (
          <S.Tab
            key={cat.id}
            $active={activeTab === cat.id}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </S.Tab>
        ))}
      </S.TabBar>

      <S.Content>
        {/* 피처드 기사 */}
        {activeTab === "all" && featuredArticle && (
          <S.FeaturedArticle>
            <S.FeaturedImage src={featuredArticle.image} alt={featuredArticle.title} />
            <S.FeaturedContent>
              <S.FeaturedBadge>
                <FaFire /> 주목!
              </S.FeaturedBadge>
              <S.FeaturedTitle>{featuredArticle.title}</S.FeaturedTitle>
              <S.FeaturedSubtitle>{featuredArticle.subtitle}</S.FeaturedSubtitle>
              <S.FeaturedMeta>
                <span>{featuredArticle.author}</span>
                <span>•</span>
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>{featuredArticle.readTime} 읽기</span>
              </S.FeaturedMeta>
              <S.ReadButton>
                <FaPlayCircle /> 읽어보기
              </S.ReadButton>
            </S.FeaturedContent>
          </S.FeaturedArticle>
        )}

        {/* 일반 기사 그리드 */}
        <S.ArticleGrid>
          {(activeTab === "all" ? regularArticles : filteredArticles).map((article) => (
            <S.ArticleCard key={article.id}>
              <S.ArticleImage src={article.image} alt={article.title} />
              <S.ArticleContent>
                <S.ArticleCategory>
                  {categories.find((c) => c.id === article.category)?.label}
                </S.ArticleCategory>
                <S.ArticleTitle>{article.title}</S.ArticleTitle>
                <S.ArticleSubtitle>{article.subtitle}</S.ArticleSubtitle>
                <S.ArticleMeta>
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </S.ArticleMeta>
              </S.ArticleContent>
            </S.ArticleCard>
          ))}
        </S.ArticleGrid>
      </S.Content>
    </S.Container>
  );
};

export default Magazine;
