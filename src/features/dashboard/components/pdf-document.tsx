"use client";

import type { getUserData } from "@/features/portfolio/lib/queries";
import { formatDate } from "@/shared/lib/utils";
import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

type Props = {
  data?: Awaited<ReturnType<typeof getUserData>>;
  isDarkTheme: boolean;
};

export function PDFDocument({ data, isDarkTheme }: Props) {
  if (!data) return null;

  const {
    userData,
    profile,
    workExperiences,
    educations,
    projects,
    languages,
  } = data;

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
      backgroundColor: isDarkTheme ? "#121212" : "#FFFFFF",
      color: isDarkTheme ? "#FAFAFA" : "#121212",
    },
    section: {
      marginBottom: 20,
    },
    header: {
      flexDirection: "row",
      marginBottom: 20,
    },
    headerContent: {
      flex: 1,
      paddingLeft: 15,
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
      color: isDarkTheme ? "#FAFAFA" : "#121212",
    },
    position: {
      fontSize: 14,
      color: isDarkTheme ? "#B4B4B4" : "#555555",
      marginBottom: 5,
    },
    contact: {
      fontSize: 10,
      color: isDarkTheme ? "#B4B4B4" : "#555555",
      marginBottom: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      paddingBottom: 5,
      borderBottom: `1px solid ${isDarkTheme ? "#333" : "#EBEBEB"}`,
      color: isDarkTheme ? "#FAFAFA" : "#121212",
    },
    bio: {
      fontSize: 11,
      lineHeight: 1.5,
      marginBottom: 10,
      color: isDarkTheme ? "#E0E0E0" : "#333333",
    },
    socialLinks: {
      flexDirection: "row",
      marginTop: 5,
    },
    socialLink: {
      fontSize: 10,
      color: isDarkTheme ? "#7B68EE" : "#1E40AF",
      marginRight: 15,
      textDecoration: "none",
    },
    projectItem: {
      marginBottom: 12,
    },
    projectTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: isDarkTheme ? "#FAFAFA" : "#121212",
    },
    projectDescription: {
      fontSize: 10,
      marginTop: 3,
      marginBottom: 3,
      color: isDarkTheme ? "#E0E0E0" : "#333333",
    },
    projectLinks: {
      flexDirection: "row",
      marginTop: 3,
    },
    projectLink: {
      fontSize: 9,
      color: isDarkTheme ? "#7B68EE" : "#1E40AF",
      marginRight: 15,
      textDecoration: "none",
    },
    technologies: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 3,
    },
    technology: {
      fontSize: 8,
      backgroundColor: isDarkTheme ? "#333" : "#F3F4F6",
      color: isDarkTheme ? "#E0E0E0" : "#333333",
      padding: "3 6",
      marginRight: 5,
      marginBottom: 3,
      borderRadius: 3,
    },
    experienceItem: {
      marginBottom: 12,
    },
    experienceTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: isDarkTheme ? "#FAFAFA" : "#121212",
    },
    experienceCompany: {
      fontSize: 11,
      fontWeight: "bold",
      color: isDarkTheme ? "#FAFAFA" : "#121212",
    },
    experienceDate: {
      fontSize: 10,
      color: isDarkTheme ? "#B4B4B4" : "#555555",
      marginTop: 2,
      marginBottom: 2,
    },
    experienceDescription: {
      fontSize: 10,
      marginTop: 3,
      color: isDarkTheme ? "#E0E0E0" : "#333333",
    },
    educationItem: {
      marginBottom: 12,
    },
    educationTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: isDarkTheme ? "#FAFAFA" : "#121212",
    },
    educationInstitution: {
      fontSize: 11,
      fontWeight: "bold",
      color: isDarkTheme ? "#FAFAFA" : "#121212",
    },
    educationDate: {
      fontSize: 10,
      color: isDarkTheme ? "#B4B4B4" : "#555555",
      marginTop: 2,
      marginBottom: 2,
    },
    educationDescription: {
      fontSize: 10,
      marginTop: 3,
      color: isDarkTheme ? "#E0E0E0" : "#333333",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            src={userData.imageUrl || "/placeholder.svg"}
            style={styles.image}
          />
          <View style={styles.headerContent}>
            <Text style={styles.name}>
              {profile?.fullName || userData.name}
            </Text>
            <Text style={styles.position}>Frontend Developer</Text>
            <Text style={styles.contact}>{userData.email}</Text>
            <View style={styles.socialLinks}>
              {profile?.linkedInUrl && (
                <Link src={profile.linkedInUrl} style={styles.socialLink}>
                  LinkedIn
                </Link>
              )}
              {profile?.githubUrl && (
                <Link src={profile.githubUrl} style={styles.socialLink}>
                  GitHub
                </Link>
              )}
              {profile?.xUrl && (
                <Link src={profile.xUrl} style={styles.socialLink}>
                  Twitter
                </Link>
              )}
            </View>
          </View>
        </View>

        {/* Profile Section */}
        {profile?.biography && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            {profile?.biography && (
              <Text style={styles.bio}>{profile.biography}</Text>
            )}
          </View>
        )}

        {/* Work Experience Section */}
        {workExperiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workExperiences.map((experience) => (
              <View key={experience.id} style={styles.experienceItem}>
                <Text style={styles.experienceCompany}>
                  {experience.companyName}
                </Text>
                <Text style={styles.experienceTitle}>
                  {experience.position}
                </Text>
                <Text style={styles.experienceDate}>
                  {formatDate(experience.startDate)} -
                  {experience.endDate
                    ? formatDate(experience.endDate)
                    : " Present"}
                </Text>
                {experience.description && (
                  <Text style={styles.experienceDescription}>
                    {experience.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {educations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {educations.map((education) => (
              <View key={education.id} style={styles.educationItem}>
                <Text style={styles.educationInstitution}>
                  {education.institution}
                </Text>
                <Text style={styles.educationTitle}>{education.degree}</Text>
                <Text style={styles.educationDate}>
                  {formatDate(education.startDate)} -
                  {education.endDate
                    ? formatDate(education.endDate)
                    : " Present"}
                </Text>
                {education.description && (
                  <Text style={styles.educationDescription}>
                    {education.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.name}</Text>
                <Text style={styles.projectDescription}>
                  {project.description}
                </Text>
                <View style={styles.technologies}>
                  {project.technologies.map((tech) => (
                    <Text
                      key={`${project.name}-${tech}`}
                      style={styles.technology}
                    >
                      {tech}
                    </Text>
                  ))}
                </View>
                <View style={styles.projectLinks}>
                  {project.repositoryUrl && (
                    <Link
                      src={project.repositoryUrl}
                      style={styles.projectLink}
                    >
                      GitHub
                    </Link>
                  )}
                  {project.deploymentUrl && (
                    <Link
                      src={project.deploymentUrl}
                      style={styles.projectLink}
                    >
                      Demo
                    </Link>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Languages Section */}
        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((language) => (
              <Text key={language.name} style={styles.bio}>
                {language.name} - {language.level}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
